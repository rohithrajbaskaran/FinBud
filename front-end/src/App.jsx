import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<SignIn />} />
                <Route path="/dashboard" element={<DashBoard />} />

            </Routes>
        </>
    );
};

export default App;



