// src/features/signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    error: null
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        updateField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        signupRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        signupSuccess: (state) => {
            state.isLoading = false;
            state.username = '';
            state.email = '';
            state.password = '';
            state.confirmPassword = '';
        },
        signupFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { updateField, signupRequest, signupSuccess, signupFailure } = signupSlice.actions;
export default signupSlice.reducer;
