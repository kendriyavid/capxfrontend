// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logout as logoutAction } from './authSlice';
// import {useSelector, useDispatch} from 'react-redux';
// import { useLogoutMutation } from './authApiSlice.js';
// import {useNavigate} from 'react-router-dom'

// const navigate = useNavigate();
// const dispatch = useDispatch();
// const user = useSelector((state) => state.auth.user);
// const [logoutMutation] = useLogoutMutation();

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:3000/api',
//     // baseUrl: 'https://capxbackend-lp2b.onrender.com/api',

//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.accessToken;
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     }
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     console.log("here")
//     let result = await baseQuery(args, api, extraOptions);
//     console.log(result)
    
//     if (result?.error?.status === 403) {
//         const refreshToken = api.getState().auth.refreshToken;
//         console.log("here inside")
//         const refreshResult = await baseQuery({
//             url: '/auth/refresh',
//             method: 'POST',
//             body: { refreshToken }
//         }, api, extraOptions);
        
//         if (refreshResult?.data) {
//             console.log(refreshResult)
//             const { accessToken, refreshToken, user } = refreshResult.data;
//             api.dispatch(setCredentials({ accessToken, refreshToken, user }));
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             try {
//                 await logoutMutation(user).unwrap();
//                 dispatch(logoutAction());
//                 navigate('/signin');
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }
//     return result;
// };

// export const apiSlice = createApi({
//     reducerPath: 'api',
//     baseQuery: baseQueryWithReauth,
//     tagTypes: ['Auth'],
//     endpoints: builder => ({})
// });

// export default apiSlice;



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout as logoutAction } from './authSlice';
import { useLogoutMutation } from './authApiSlice.js';

export const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3000/api',
    baseUrl: 'https://capxbackend-lp2b.onrender.com/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log("Access token expired, attempting refresh...");
        const refreshToken = api.getState().auth.refreshToken;

        if (!refreshToken) {
            console.error("No refresh token available, logging out...");
            return handleLogout(api, args);
        }

        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'POST',
            body: { refreshToken }
        }, api, extraOptions);

        if (refreshResult?.data) {
            const { accessToken, refreshToken, user } = refreshResult.data;
            api.dispatch(setCredentials({ accessToken, refreshToken, user }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            console.error("Refresh token expired or invalid, logging out...");
            return handleLogout(api, args);
        }
    }

    return result;
};

// Helper function to handle logout
export const handleLogout = async (api, args) => {
    const { dispatch } = api;
    try {
        const user = api.getState().auth.user;
        const [logoutMutation] = useLogoutMutation(); 
        await logoutMutation(user).unwrap();
    } catch (err) {
        console.error("Logout mutation failed:", err);
    } finally {
        dispatch(logoutAction());
        args.extra?.navigate?.('/signin'); 
    }
    return { error: { status: 403, data: "Logged out" } };
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth'],
    endpoints: builder => ({})
});

export default apiSlice;
