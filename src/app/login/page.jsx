"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        let newErrors = {};

        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Login success (future backend)");
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google login will be implemented later");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-2xl font-bold text-center text-indigo-950">
                    Welcome Back
                </h1>

                <p className="text-center text-slate-500 mt-2 text-sm">
                    Login to continue exploring artworks
                </p>

                <button
                    onClick={handleGoogleLogin}
                    className="mt-6 w-full flex items-center justify-center gap-3 border border-slate-300 rounded-md py-3 hover:bg-slate-50 transition"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-xs text-slate-400">OR</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                <form className="flex flex-col gap-4">

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}

                    </div>

                    {/* Login Button */}
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-slate-500 mt-4">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-teal-600">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;