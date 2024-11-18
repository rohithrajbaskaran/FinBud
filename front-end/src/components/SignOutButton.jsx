import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase"; // Import Supabase client

const DashBoard = () => {
    const navigate = useNavigate(); // Hook to navigate to different routes

    const handleSignOut = async () => {
        // Sign the user out using Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error.message);
        } else {
            // Redirect to the SignIn page after sign out
            navigate("/signin");
        }
    };

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            {/* Your dashboard content here */}

            {/* Sign out button */}
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default DashBoard;
