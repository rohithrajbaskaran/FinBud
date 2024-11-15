import { useState } from "react";
import Supabase from "../supabase"; // Import Supabase client
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUpStyle.scss"; // Import your SASS file for styles

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);

        // Sign up using Supabase
        const { data, error } = await Supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setSuccess(null);
            setError(error.message); // Display error if any
        } else {
            // User successfully signed up
            setSuccess("Signed Up Successfully");
        }
    };

    return (
        <div className="signup-container">
            <h1 className="main-title">Welcome to FinBud</h1>
            <form className="signup-form" onSubmit={handleSignUp}>
                <h2 className="signup-title">Sign Up</h2>
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
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="signup-button">Sign Up</button>
                {error && <p className="error-message">{error}</p>}

                <h1 className="signin-label">
                    Already have an account? <Link to="/signin">Sign in here.</Link>
                </h1>
            </form>
        </div>
    );
};

export default SignUp;


