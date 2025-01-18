
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
            query: () => ({
                url: '/stocks/getuserportfolio',
                method: 'POST',
                // body: { user },
            }),
        }),
        getuserTransactions: builder.mutation({
            query: () => ({
                url: '/stocks/gettransactionhistory',
                method: 'POST',
                // body: { user },
            }),
        }),
        getuserValuation: builder.mutation({
            query: () => ({
                url: '/stocks/getvaluation',
                method: 'POST',
                // body: { user },
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