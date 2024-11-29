import {useState} from "react";
import supabase from "../../services/supabase.jsx"; // Import Supabase client
import { Link } from "react-router-dom";
import "./SignUpStyle.scss";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // State for username
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);

        // Sign up using Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setSuccess(null);
            setError(error.message); // Display error if any
        } else {
            // If the user signs up successfully, insert the username into the profiles table
            try {
                const { data: {session} } = await supabase.auth.getSession();
                const user = session.user;

                const { data, error: profileError } = await supabase
                    .from('client')
                    .insert(
                        {
                            username: username,
                            client_id: user.id,
                            email: email,
                            password: password,
                        },
                    )
                    .select()

                if (profileError) {
                    setError(profileError.message);
                } else {
                    setSuccess("Signed Up Successfully");
                }
            } catch (profileError) {
                setError("Error saving profile information");
                console.error("Profile error:", profileError);
            }
        }
    };

    return (
        <div className="signup-container">
            <h1 className="main-title">Welcome to FinBud</h1>
            <form className="signup-form" onSubmit={handleSignUp}>
                <h2 className="signup-title">Sign Up</h2>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
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



