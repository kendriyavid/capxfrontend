// import {updateStocks, setConnectionStatus, updateUserStocks, updatePortfolioValue} from './stocksSlice';
// import {apiSlice} from './apiSlice';
// import {useSelector} from 'react-redux';


// export const stockApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//       connectToSSE: builder.mutation({
//         queryFn: () => ({ data: null }),
//         async onCacheEntryAdded(
//             arg,
//             { dispatch, getState, cacheDataLoaded, cacheEntryRemoved }
//         ) {
//             try {
//                 await cacheDataLoaded;
//                 const eventSource = new EventSource('http://localhost:3000/api/sse');
//                 eventSource.onopen = () => {
//                     dispatch(setConnectionStatus(true));
//                     console.log('SSE Connection Opened');
//                 };
//                 eventSource.onmessage = (event) => {
//                     const data = JSON.parse(event.data);
//                     const state = getState();
//                     const userStocks = state.stocks.userStocks;
//                     if (data.type === 'update') {
//                         dispatch(updateStocks({
//                             stocks: data.data,
//                             timestamp: data.timestamp
//                         }));
//                         if(userStocks.length > 0){
//                             const updatedUserStocks = userStocks.map((stock) => {
//                                 const updatedStock = data.data.find((d)=>d.symbol === stock.stocks.stock_symbol);
//                                 if(updatedStock){
//                                     return{
//                                         ...stock,
//                                         stocks: {
//                                             ...stock.stocks,
//                                             current_price: updatedStock.data.c ///
//                                         }
//                                     }
//                                 }
//                                 return stock;
//                             })
//                             const newportfolio = updatedUserStocks.reduce((acc, stock) => 
//                                 acc + (stock.stocks.current_price * stock.units_held), 0
//                             );
//                             dispatch(updateUserStocks(updatedUserStocks));
//                             dispatch(updatePortfolioValue(newportfolio));
//                         }
//                     }
//                 };
//                 eventSource.onerror = (error) => {
//                     console.error('SSE Error:', error);
//                     dispatch(setConnectionStatus(false));
//                     eventSource.close();
//                 };

//                 await cacheEntryRemoved;
//                 eventSource.close();
//                 dispatch(setConnectionStatus(false));

//             } catch (error) {
//                 console.error('SSE Connection Error:', error);
//                 dispatch(setConnectionStatus(false));
//             }}
//     }),
//     getuserstocks: builder.mutation({
//         query: (user) => ({
//             url: '/stocks/getuserportfolio',
//             method: 'POST',
//             body: { user },
//         }),
//     }),
//     getuserTransactions: builder.mutation({
//         query: (user) => ({
//             url: '/stocks/gettransactionhistory',
//             method: 'POST',
//             body: { user },
//         }),
//     }),
//     getuserValuation: builder.mutation({
//         query: (user) => ({
//             url: '/stocks/getvaluation',
//             method: 'POST',
//             body: { user },
//         }),
//     })
// })});
// export const {
//     useConnectToSSEMutation,
//     useGetuserstocksMutation,
//     useGetuserTransactionsMutation,
//     useGetuserValuationMutation
// } = stockApiSlice;



import { apiSlice } from './apiSlice';

export const stockApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        connectToSSE: builder.mutation({
            query: () => ({
                url: '/stocks/connect', // You might want to add an endpoint to track connections
                method: 'POST'
            })
        }),
        getuserstocks: builder.mutation({
            query: (user) => ({
                url: '/stocks/getuserportfolio',
                method: 'POST',
                body: { user },
            }),
        }),
        getuserTransactions: builder.mutation({
            query: (user) => ({
                url: '/stocks/gettransactionhistory',
                method: 'POST',
                body: { user },
            }),
        }),
        getuserValuation: builder.mutation({
            query: (user) => ({
                url: '/stocks/getvaluation',
                method: 'POST',
                body: { user },
            }),
        })
    })
});

export const {
    useConnectToSSEMutation,
    useGetuserstocksMutation,
    useGetuserTransactionsMutation,
    useGetuserValuationMutation
} = stockApiSlice;