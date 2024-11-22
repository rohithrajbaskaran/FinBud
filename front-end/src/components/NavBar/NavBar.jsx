import {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import "./NavBar.scss";
import SignOutButton from "../SignOutButton.jsx";
import {store} from "../../app/store.jsx";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const username = useSelector((state) => state.auth.username);

    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="side-menu-container">
            {/* Side Menu */}
            <div className={`side-menu ${isOpen ? "open" : ""}`}>
                <div className="brand">
                    <Link to="/dashboard">
                        Welcome Back<br /> <span>{username}</span>
                    </Link>
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
                        to="/budget"
                        className={location.pathname === "/budget" ? "active" : ""}
                    >
                        Budget
                    </Link>
                    <Link
                        to="/settings"
                        className={location.pathname === "/settings" ? "active" : ""}
                    >
                        Settings
                    </Link>
                    <Link
                        to="/advisor"
                        className={location.pathname === "/advisor" ? "active" : ""}
                    >
                        Advisor
                    </Link>
                </div>

                {/* User Menu */}
                <div className="user-menu">
                    <button className="user-email">{user?.email || "Loading..."}</button>
                    <SignOutButton />
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






