import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeSession } from './sessionManager';
import supabase from "../../services/supabase.jsx";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initialize = async () => {
            await initializeSession(dispatch);
        };

        initialize();

        // Clean up subscription when component unmounts
        return () => {
            const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {});
            subscription?.unsubscribe();
        };
    }, [dispatch]);

    return children;
};

export default AuthProvider;