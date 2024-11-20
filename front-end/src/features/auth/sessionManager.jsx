import { login, logout, setLoading } from "./authSlice";
import supabase from "../../services/supabase"; // Adjust the import path as needed
import fetchUserData from "../../services/fetchUserData"; // Import the fetchUserData function

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
            // Fetch user data after successful sign-in
            await fetchUserData(dispatch);
        } else {
            dispatch(logout());
        }
    } catch (error) {
        console.error("Session initialization error:", error);
        dispatch(logout());
    } finally {
        dispatch(setLoading(false));
    }

    // Listen for authentication state changes (SIGN_IN, SIGN_OUT, TOKEN_REFRESHED)
    supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (event === "SIGNED_IN") {
            dispatch(login({ user: newSession.user, session: newSession }));
            // Fetch user data after successful sign-in
            await fetchUserData(dispatch);
        } else if (event === "SIGNED_OUT") {
            dispatch(logout());
        } else if (event === "TOKEN_REFRESHED") {
            dispatch(login({ user: newSession.user, session: newSession }));
            // Optionally, fetch user data after token refresh
            await fetchUserData(dispatch);
        }
    });
};

