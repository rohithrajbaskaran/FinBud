import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

import "../styles/NavBar.scss";
import SignOutButton from "./SignOutButton.jsx"; // Import the updated styles

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const location = useLocation(); // Get the current route

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="side-menu-container">
            {/* Side Menu */}
            <div className={`side-menu ${isOpen ? "open" : ""}`}>
                <div className="brand">
                    <Link to="/dashboard">Welcome Back {user?.email}!</Link>
                </div>

                {/* Menu Links */}
                <div className="menu-links">
                    <Link
                        to="/dashboard"
                        className={location.pathname === "/dashboard" ? "active" : ""}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/reports"
                        className={location.pathname === "/reports" ? "active" : ""}
                    >
                        Reports
                    </Link>
                    <Link
                        to="/transactions"
                        className={location.pathname === "/transactions" ? "active" : ""}
                    >
                        Transactions
                    </Link>
                    <Link
                        to="/settings"
                        className={location.pathname === "/settings" ? "active" : ""}
                    >
                        Settings
                    </Link>
                </div>

                {/* User Menu */}
                <div className="user-menu">
                    <button className="user-email">{user?.email}</button>
                    <SignOutButton></SignOutButton>
                </div>
            </div>

            {/* Mobile menu toggle button */}
            <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
    );
};

export default NavBar;




