import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import App from "./App.jsx";        // Landing Page Component

// Define the router with separate routes for Landing and Dashboard
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Landing Page
    },
    // {
    //     path: "/signin",
    //     element: <SignIn />, // Sign-in Page
    // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
