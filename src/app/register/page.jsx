"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!form.name) newErrors.name = "Name is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";
        if (!form.confirmPassword)
            newErrors.confirmPassword = "Confirm password is required";
        if (!form.role) newErrors.role = "Please select a role";

        if (
            form.password &&
            form.confirmPassword &&
            form.password !== form.confirmPassword
        ) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Register success (frontend only)", form);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-2xl font-bold text-center text-indigo-950">
                    Create Account
                </h1>

                <p className="text-center text-slate-500 mt-2 text-sm">
                    Join ArtHub and start exploring artworks
                </p>

                <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-6">

                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                    </div>


                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
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
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-slate-600 mb-2">
                            Register as:
                        </p>

                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="buyer"
                                    onChange={handleChange}
                                />
                                User (Buyer)
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="artist"
                                    onChange={handleChange}
                                />
                                Artist (Seller)
                            </label>
                        </div>

                        {errors.role && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-teal-600">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default RegisterPage;