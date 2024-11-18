import { login, logout, setLoading } from "./authSlice";
import supabase from "../../services/supabase"; // Adjust the import path as needed

export const initializeSession = async (dispatch) => {
    dispatch(setLoading(true));

    try {
        // Check session on app load
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error.message);
            dispatch(logout());
            return;
        }

        if (session) {
            dispatch(login({ user: session.user, session }));
        } else {
            dispatch(logout());
        }
    } catch (error) {
        console.error("Session initialization error:", error);
        dispatch(logout());
    } finally {
        dispatch(setLoading(false));
    }

    // Listen for authentication state changes
    supabase.auth.onAuthStateChange((event, newSession) => {
        if (event === "SIGNED_IN") {
            dispatch(login({ user: newSession.user, session: newSession }));
        } else if (event === "SIGNED_OUT") {
            dispatch(logout());
        } else if (event === "TOKEN_REFRESHED") {
            dispatch(login({ user: newSession.user, session: newSession }));
        }
    });
};

// Add this function to check session validity
export const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
};