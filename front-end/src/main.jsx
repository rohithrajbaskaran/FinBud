import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import './index.css'

// Import your components
import DashBoard from "./pages/private/DashBoard.jsx";
import SignIn from "./pages/public/SignIn.jsx";
import SignUp from "./pages/public/SignUp.jsx";
import store from "./app/store.jsx";

import {PublicLayout, ProtectedLayout, AuthWrapper} from './features/auth/AuthProvider.jsx'
import Settings from "./pages/private/Settings.jsx";
import Reports from "./pages/private/Reports.jsx";


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
                        path: "/reports",
                        element: <Reports />,
                    }
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
        v7_skipActionStatusRevalidation: true,
        v7_skipActionErrorRevalidation: true,
    },
});

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
);