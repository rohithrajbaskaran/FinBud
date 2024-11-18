import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeSession } from "./features/auth/sessionManager.jsx";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        initializeSession(dispatch); // Restore session on app load
    }, [dispatch]);

    return null; // No routes here since they're defined in createBrowserRouter
};

export default App;




