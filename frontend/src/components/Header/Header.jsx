import React from 'react';
import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css"

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);

    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className="header bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <NavLink to="/" className="text-2xl font-bold text-gray-700 hover:text-gray-500 transition-colors">
                                ✓ TaskMaster
                            </NavLink>
                        </div>

                        <div className="flex items-center">
                            {token ? (
                                <div className="flex items-center space-x-4">
                                    <div className="text-gray-700">
                                        Welcome, <span className="font-semibold text-yellow-500 capitalize">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out transform hover:scale-105"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <NavLink
                                        to="/login"
                                        className="text-gray-700 px-4 py-2 rounded-lg"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="text-gray-700 px-4 py-2 rounded-lg"
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;