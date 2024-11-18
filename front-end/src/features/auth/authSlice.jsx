import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    session: null,
    isLoading: true, // Add loading state
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.session = action.payload.session;
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.session = null;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;