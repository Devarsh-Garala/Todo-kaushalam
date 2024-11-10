import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
    return (

        <nav className="max-w-screen-xl mx-auto">
            <ul className="flex items-center justify-center gap-2 p-2">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 bg-yellow-400 text-white rounded-md transition-colors"
                                : "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        }
                    >
                        All Tasks
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/active"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 bg-yellow-400 text-white rounded-md transition-colors"
                                : "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        }
                    >
                        Active
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/completed"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 bg-yellow-400 text-white rounded-md transition-colors"
                                : "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        }
                    >
                        Completed
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default TaskIndicator;