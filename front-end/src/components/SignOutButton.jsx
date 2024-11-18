import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase.jsx";
import {LogOut} from "lucide-react";
import {logout} from "../features/auth/authSlice.jsx";
import {useDispatch} from "react-redux"; // Import Supabase client


const DashBoard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            dispatch(logout());
            navigate("/signin");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18}/> Logout
        </button>
    );
};

export default DashBoard;
