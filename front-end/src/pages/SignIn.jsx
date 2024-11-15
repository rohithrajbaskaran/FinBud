// SignIn.js
import { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Supabase from "../supabase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignInStyle.scss"; // Import the Sass file for styles

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);

        const { data, error } = await Supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            const session = Supabase.auth.session(); // Supabase manages session internally
            navigate("/dashboard"); // Redirect to Dashboard
        }
    };

    const handleOAuthSignIn = async (provider) => {
        const { error } = await Supabase.auth.signInWithOAuth({
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
                <button type="submit" className="signin-button">Sign In</button>
                {error && <p className="error-message">{error}</p>}

                <h1 className="signup-label">Dont have an account? <Link to='/signup' >Create one.</Link></h1>

                <hr className="white-line"/>

                <button
                    type="button"
                    className="oauth-button google"
                    onClick={() => handleOAuthSignIn('google')}
                >
                    <FcGoogle/>
                    Sign In with Google
                </button>
                <button
                    type="button"
                    className="oauth-button facebook"
                    onClick={() => handleOAuthSignIn('facebook')}
                >
                    <FaFacebookF/>
                    Sign In with Facebook
                </button>
            </form>
        </div>
    );
};

export default SignIn;

