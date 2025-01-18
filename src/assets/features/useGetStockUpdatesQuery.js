

import { apiSlice, handleLogout } from './apiSlice.js';
import { baseQuery } from './apiSlice.js';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { updateStocks, updateUserStocks, updatePortfolioValue } from './stocksSlice.js';
import { store } from '../app/store.js';
import { setCredentials } from './authSlice.js';

// Create a standalone refresh function
const refreshTokenFn = async (refreshToken) => {
  try {
    // Create a one-off fetch call instead of using baseQuery
    // const response = await fetch('http://localhost:3000/api/auth/refresh', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ refreshToken }),
    // });

    const response = await fetch('https://capxproject-epa6b2d3ddfqffa5.centralindia-01.azurewebsites.net/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });


    if (!response.ok) {
      throw new Error('Refresh failed');
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in refreshTokenFn:', err);
    throw err;
  }
};

export const getStockUpdates = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStockUpdates: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        let es = null;
        let retryCount = 0;
        const MAX_RETRIES = 3;
        const INITIAL_RETRY_DELAY = 1000;

        const connectSSE = async () => {
          try {
            const state = store.getState();
            const token = state.auth.accessToken;
            const user = state.auth.user;

            if (!user) {
              console.log('No user found, skipping SSE connection');
              return;
            }

            // es = new EventSourcePolyfill('http://localhost:3000/api/sse', {
            //   headers: {
            //     authorization: `Bearer ${token}`,
            //   },
            // });

            // es = new EventSourcePolyfill('https://capxbackend-lp2b.onrender.com/api/sse', {
            //   headers: {
            //     authorization: `Bearer ${token}`,
            //   },
            // });

            es = new EventSourcePolyfill('https://capxproject-epa6b2d3ddfqffa5.centralindia-01.azurewebsites.net/api/sse', {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });

            es.onmessage = (event) => {
              const data = JSON.parse(event.data);
              if (data.type === 'update') {
                updateCachedData(() => {
                  const currentState = store.getState();
                  
                  dispatch(updateStocks({
                    stocks: data.data,
                    timestamp: data.timestamp
                  }));

                  const userStocks = currentState.stocks.userStocks;
                  if (userStocks.length > 0) {
                    const updatedUserStocks = userStocks.map((stock) => {
                      const updatedStock = data.data.find(
                        (d) => d.symbol === stock.stocks.stock_symbol
                      );
                      if (updatedStock) {
                        return {
                          ...stock,
                          stocks: {
                            ...stock.stocks,
                            current_price: updatedStock.data.c
                          }
                        };
                      }
                      return stock;
                    });

                    const newPortfolio = updatedUserStocks.reduce(
                      (acc, stock) => acc + (stock.stocks.current_price * stock.units_held),
                      0
                    );

                    dispatch(updateUserStocks(updatedUserStocks));
                    dispatch(updatePortfolioValue(newPortfolio));
                  }
                });
              }
            };

            es.onerror = async (error) => {
              const currentState = store.getState();
              
              if (error.status === 403) {
                const refreshToken = currentState.auth.refreshToken;

                if (!refreshToken) {
                  console.error("No refresh token available, logging out...");
                  handleLogout(dispatch);
                  return;
                }

                try {
                  const refreshData = await refreshTokenFn(refreshToken);

                  if (refreshData?.accessToken) {
                    dispatch(setCredentials({ 
                      accessToken: refreshData.accessToken, 
                      refreshToken: refreshData.refreshToken, 
                      user: refreshData.user 
                    }));

                    es.close();
                    retryCount = 0; 
                    await connectSSE();
                  } else {
                    console.error("Unable to refresh token, logging out...");
                    handleLogout(dispatch);
                  }
                } catch (err) {
                  console.error("Error refreshing token:", err);
                  handleLogout(dispatch);
                }
              } else {
                console.error('SSE Error:', error);
                
                if (retryCount < MAX_RETRIES) {
                  const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
                  retryCount++;
                  
                  setTimeout(() => {
                    es?.close();
                    connectSSE();
                  }, delay);
                } else {
                  console.error('Max retry attempts reached');
                  handleLogout(dispatch);
                }
              }
            };
          } catch (err) {
            console.error("Error connecting SSE:", err);
          }
        };

        try {
          await cacheDataLoaded;

          if (store.getState().auth.user) {
            await connectSSE();
          }

          const unsubscribe = store.subscribe(() => {
            const user = store.getState().auth.user;
            if (user && !es) {
              connectSSE();
            } else if (!user && es) {
              es.close();
              es = null;
            }
          });

          await cacheEntryRemoved;
          unsubscribe();
          es?.close();
        } catch (error) {
          console.error('Error setting up SSE:', error);
        }
      }
    })
  })
});

export const { useGetStockUpdatesQuery } = getStockUpdates;