import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import './index.css'

// Import your components
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
import SignIn from "./pages/SIgnInPage/SignIn.jsx";
import SignUp from "./pages/SIgnUpPage/SignUp.jsx";
import {store, persistor} from "./app/store.jsx";
import { PersistGate } from 'redux-persist/integration/react';

import {PublicLayout, ProtectedLayout, AuthWrapper} from './routing/routing.jsx'
import Settings from "./pages/Settings.jsx";
import AddData from "./pages/AddData.jsx";
import Budget from "./pages/Budget.jsx";
import Advisor from "./pages/Advisor.jsx";


// Create router with auth wrapper
const router = createBrowserRouter([
    {
        element: <AuthWrapper><Outlet /></AuthWrapper>,
        children: [
            {
                element: <PublicLayout />,
                children: [
                    {
                        path: "/signin",
                        element: <SignIn />,
                    },
                    {
                        path: "/signup",
                        element: <SignUp />,
                    },
                ],
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "/",
                        element: <Navigate to="/dashboard" replace />,
                    },
                    {
                        path: "/dashboard",
                        element: <DashBoard />,
                    },
                    {
                        path: "/settings",
                        element: <Settings />,
                    },
                    {
                        path: "/add-data",
                        element: <AddData />,
                    },
                    {
                        path: "/budget",
                        element: <Budget />,
                    },
                    {
                        path: "/advisor",
                        element: <Advisor />,
                    },
                    // Add more protected routes here
                ],
            },
        ],
    },
], {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </PersistGate>
    </Provider>
);