import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {initializeSession} from "./sessionManager.jsx";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

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

export {PublicLayout, ProtectedLayout, AuthWrapper}