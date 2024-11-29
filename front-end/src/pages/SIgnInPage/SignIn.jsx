import {useState} from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import supabase from "../../services/supabase.jsx"; // Import Supabase client
import { useNavigate, Link } from "react-router-dom";
import "./SignInStyle.scss"; // Import your SASS file for styles

import { useDispatch } from "react-redux";
import {login} from "../../features/auth/authReducer.jsx";
import fetchUserData from "../../services/fetchUserData.jsx";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                // Fetch user data from client table
                const { data: client, error: clientError } = await supabase
                    .from("client")
                    .select("username")
                    .eq("client_id", data.user.id)
                    .single();

                if (clientError) {
                    setError(clientError.message);
                    return;
                }

                // Dispatch login action with user data
                dispatch(login({
                    user: data.user,
                    username: client.username,
                    session: data.session
                }));

                navigate("/dashboard");

                await fetchUserData(dispatch);
            }
        } catch (error) {
            setError("An unexpected error occurred");
            console.error("Sign in error:", error);
        }
    };

    const handleOAuthSignIn = async (provider) => {
        try {
            // Sign in using the OAuth provider (Google/Facebook)
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: window.location.origin + "/dashboard", // Redirect after successful login
                },
            });

            if (error) {
                setError(error.message); // Handle OAuth error
            } else {
                // Dispatch the login action to store user and session data in Redux
                dispatch(login({
                    user: data.user,      // The user object returned from Supabase
                    session: data.session // The session object returned from Supabase
                }));

                // Navigate to the dashboard page after successful login
                navigate("/dashboard");
            }
        } catch (error) {
            setError("An unexpected error occurred");
            console.error("OAuth sign-in error:", error); // Log any errors that occur during OAuth
        }
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
