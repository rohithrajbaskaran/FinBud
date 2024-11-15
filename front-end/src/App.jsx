import './App.css'
import SignIn from "./pages/SignIn.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import {useState} from "react";

function App() {
    const sessionSample = false;

    return (
        <>
            {sessionSample ? <DashBoard /> : <LandingPage />}
            <SignIn />
        </>
    )
}

export default App;
