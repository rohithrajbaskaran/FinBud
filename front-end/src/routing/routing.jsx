import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {sessionManager} from "../features/auth/sessionManager.jsx";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import fetchUserData from "../services/fetchUserData.jsx";

// Create AuthWrapper component
const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let cleanupFn;

        const initialize = async () => {
            try {
                const cleanup = await sessionManager(dispatch);
                cleanupFn = cleanup;
            } catch (error) {
                console.error("Failed to initialize session:", error);
            }
        };

        initialize();

        return () => {
            if (typeof cleanupFn === 'function') {
                cleanupFn();
            }
        };
    }, [dispatch]);

    return children;
};

// Protected Layout Component
const ProtectedLayout = () => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If not authenticated, redirect to signin and preserve the original path
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate
            to="/signin"
            state={{ from: location }}
            replace
        />
    );
};

// Public Layout Component
const PublicLayout = () => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If already authenticated, redirect to dashboard or the original destination
    return !isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate
            to={location.state?.from?.pathname || "/dashboard"}
            replace
        />
    );
};



export { PublicLayout, ProtectedLayout, AuthWrapper };