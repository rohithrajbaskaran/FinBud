import { useState } from "react";
import Supabase from "../supabase";
import { useNavigate } from "react-router-dom";
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
            const session = Supabase.auth.session();
            navigate("/dashboard");
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSignIn}>
                <h2 className="signin-title">Sign In</h2>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="signin-button">Sign In</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
