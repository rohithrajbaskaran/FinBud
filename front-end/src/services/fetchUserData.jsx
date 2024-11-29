import supabase from "./supabase.jsx";
import {login} from "../features/auth/authReducer.jsx";

const fetchUserData = async (dispatch) => {
    try {
        // Get session and user info
        const { data: {session} } = await supabase.auth.getSession();

        if (session) {
            const user = session.user;

            // Fetch username from the client table
            const { data: client, error } = await supabase
                .from("client")
                .select("username")
                .eq("client_id", user.id) 
                .single();

            if (error) {
                throw new Error(error.message);
            }

            // Dispatch loadUser with user and username
            dispatch(
                login({
                    user,
                    username: client.username,
                    session,
                })
            );
        } else {
            console.log("No active session found.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export default fetchUserData;