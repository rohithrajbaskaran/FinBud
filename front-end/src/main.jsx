import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import App from "./App.jsx";
import DashBoard from "./pages/DashBoard.jsx";        // Landing Page Component

// Define the router with separate routes for Landing and Dashboard
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Landing Page
    },
    {
        path: "/dashboard",
        element: <DashBoard />, // Sign-in Page
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
