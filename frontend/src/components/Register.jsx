import React from 'react';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';

function Register() {
    const [formData, setFormData] = useState({})
    const {userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/register", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken", JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {userToken && <Navigate to="/" />}
            <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
                            Create your account
                        </h2>
                    </div>
                    {error && (
                        <div className="text-center border-2 border-yellow-600 p-2 mb-2 rounded-md bg-red-200 shadow-md">
                            {error.message}
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="relative block w-full rounded-md border-2 border-gray-200 px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="relative block w-full rounded-md border-2 border-gray-200 px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="relative block w-full rounded-md border-2 border-gray-200 px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;