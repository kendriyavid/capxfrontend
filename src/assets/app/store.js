// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import authReducer from '../features/authSlice';
import signupReducer from '../features/signupSlice';
import stockReducer from '../features/stocksSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['accessToken', 'refreshToken', 'user'], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // [stocksApi.reducerPath]: stocksApi.reducer,
        auth: persistedAuthReducer,
        signup: signupReducer,
        stocks: stockReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).concat([
            apiSlice.middleware,
            // stocksApi.middleware
        ]),
    devTools: true,
});


export const persistor = persistStore(store);

 