import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        username: null, // Add username
        session: null,
        data: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.session = action.payload.session;
            state.data = action.payload.data;
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.username = null;
            state.session = null;
            state.data = null;
            state.isLoading = false;
        },
    },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
