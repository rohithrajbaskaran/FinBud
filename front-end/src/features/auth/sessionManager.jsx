import { logout } from "./authReducer.jsx";
import supabase from "../../services/supabase";
import fetchUserData from "../../services/fetchUserData";

export const sessionManager = async (dispatch) => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error.message);
            dispatch(logout());
            return;
        }

        if (!session) {
            dispatch(logout());
            return;
        }

        // Initial fetch of user data
        await fetchUserData(dispatch);

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            console.log("Auth state changed:", event);
            
            if (event === "SIGNED_OUT" || !currentSession) {
                dispatch(logout());
            } else if (currentSession) {
                await fetchUserData(dispatch);
            }
        });

        // Return cleanup function
        return () => {
            subscription?.unsubscribe();
        };
    } catch (error) {
        console.error("Session initialization error:", error);
        dispatch(logout());
    }
};

