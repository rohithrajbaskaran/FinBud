import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeSession } from "./features/auth/sessionManager.jsx";
import { useSelector } from "react-redux";

// Import your components
import DashBoard from "./pages/DashBoard.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import store from "./app/store.jsx";

// Create AuthWrapper component
const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initialize = async () => {
            await initializeSession(dispatch);
        };

        initialize();
    }, [dispatch]);

    return children;
};

// Protected Layout Component
const ProtectedLayout = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

// Public Layout Component
const PublicLayout = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};

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