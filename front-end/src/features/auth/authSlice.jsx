import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        username: null, // Add username
        session: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.session = action.payload.session;
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.username = null;
            state.session = null;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        loadUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.session = action.payload.session;
            state.isLoading = false;
        },
    },
});

export const { login, logout, setLoading, loadUser } = authSlice.actions;
export default authSlice.reducer;
