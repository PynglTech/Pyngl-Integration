import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';
import { Home, TrendingUp, BarChart3, User } from 'lucide-react';

const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/trending", icon: TrendingUp, label: "Trending" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/profile", icon: User, label: "Profile" }
];

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <NavLink 
                    key={item.path} 
                    to={item.path} 
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;