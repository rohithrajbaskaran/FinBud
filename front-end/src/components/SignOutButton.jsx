import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase.jsx";
import {LogOut} from "lucide-react";
import {logout} from "../features/auth/authReducer.jsx";
import {useDispatch} from "react-redux";

const SignOutButton = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            dispatch(logout());
            
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            // Clear any persisted state
            localStorage.clear();
            sessionStorage.clear();
            
            // Navigate and reload
            navigate("/signin", { replace: true });
            window.location.reload();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <button 
            onClick={handleLogout} 
            className="logout-btn"
            style={{ cursor: 'pointer' }}
        >
            <LogOut size={18}/> Logout
        </button>
    );
};

export default SignOutButton;
