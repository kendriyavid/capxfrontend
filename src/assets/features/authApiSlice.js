


import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST', 
                body: { ...credentials }
            }),
            invalidatesTags: ['Auth']
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: "POST", 
                body: { ...userData }
            }),
            invalidatesTags: ['Auth']
        }),
        logout: builder.mutation({
            query: (userData) => ({
                url: '/auth/logout',
                method: "POST",
                body: { ...userData }
            }),
            invalidatesTags: ['Auth']
        }),
    })
});

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
} = authApiSlice;
