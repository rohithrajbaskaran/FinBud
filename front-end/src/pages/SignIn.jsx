import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import supabase from "../services/supabase.jsx"; // Import Supabase client
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignInStyle.scss"; // Import your SASS file for styles

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);

        // Sign in using Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message); // Display error if any
        } else {
            // Use getSession() instead of session()
            const session = await supabase.auth.getSession(); // Get the current session
            localStorage.setItem("supabaseSession", JSON.stringify(session)); // Store session data
            navigate("/dashboard"); // Redirect to the dashboard
        }
    };

    const handleOAuthSignIn = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + "/dashboard",
            },
        });

        if (error) {
            setError(error.message);
        }
        // Supabase handles the redirect, so no need to navigate here
    };

    return (
        <div className="signin-container">
            <h1 className="main-title">Welcome to FinBud</h1>
            <form className="signin-form" onSubmit={handleSignIn}>
                <h2 className="signin-title">Sign In</h2>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="signin-button">
                    Sign In
                </button>
                {error && <p className="error-message">{error}</p>}
                <h1 className="signup-label">
                    Dont have an account? <Link to="/signup">Create one.</Link>
                </h1>
                <hr className="white-line" />
                <button
                    type="button"
                    className="oauth-button google"
                    onClick={() => handleOAuthSignIn("google")}
                >
                    <FcGoogle />
                    Sign In with Google
                </button>
                <button
                    type="button"
                    className="oauth-button facebook"
                    onClick={() => handleOAuthSignIn("facebook")}
                >
                    <FaFacebookF />
                    Sign In with Facebook
                </button>
            </form>
        </div>
    );
};

export default SignIn;

