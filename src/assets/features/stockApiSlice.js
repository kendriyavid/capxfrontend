
import { apiSlice } from './apiSlice';

export const stockApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        connectToSSE: builder.mutation({
            query: () => ({
                url: '/stocks/connect', 
                method: 'POST'
            })
        }),
        getuserstocks: builder.mutation({
            query: () => ({
                url: '/stocks/getuserportfolio',
                method: 'POST',
            }),
        }),
        getuserTransactions: builder.mutation({
            query: () => ({
                url: '/stocks/gettransactionhistory',
                method: 'POST',
            }),
        }),
        getuserValuation: builder.mutation({
            query: () => ({
                url: '/stocks/getvaluation',
                method: 'POST',
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