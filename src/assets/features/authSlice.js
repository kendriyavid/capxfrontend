import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    refreshToken: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, refreshToken, user } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logout: (state) => { 
            state.user = null;
            state.refreshToken = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;
