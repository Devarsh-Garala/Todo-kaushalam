import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';
import loginImg from '../assets/login.png';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken", JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {userToken && <Navigate to="/" />}
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-100 w-auto"
                        src={loginImg}
                        alt="Login"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-center border-2 border-yellow-400 p-2 mb-2 rounded-md bg-red-200">
                            {error.message}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgotPassword" className="font-medium text-yellow-500 hover:text-yellow-400">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-yellow-500 hover:text-yellow-400">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;