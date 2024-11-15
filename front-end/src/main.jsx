import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";


// Define the router with separate routes for Landing and Dashboard
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Landing Page
    },
    {
        path: "/dashboard",
        element: <DashBoard /> // Protected Route for Dashboard
    },
    {
        path: "/signin",
        element: <SignIn />, // SignIn Page
    },
    {
        path: "/signup",
        element: <SignUp />, // SignUp Page
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);



