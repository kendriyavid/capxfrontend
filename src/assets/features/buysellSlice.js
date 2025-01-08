// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiSlice} from './apiSlice';

export const buysellApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        buy:builder.mutation({
            query:(data)=>({
                url:'stocks/buystock',
                method:'POST',
                body:{...data}
            })
        }),
        sell:builder.mutation({
            query:(data)=>({
                url:'stocks/sellstock',
                method:'POST',
                body:{...data}
            })
        })
    })
});

export const {
    useBuyMutation,
    useSellMutation
} = buysellApiSlice;