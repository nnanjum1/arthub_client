"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error(error);
            toast.error("Google sign in failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        let newErrors = {};

        if (!user.name?.trim()) {
            newErrors.name = "Name is required";
        }

        if (!user.email?.trim()) {
            newErrors.email = "Email is required";
        }

        if (!user.password) {
            newErrors.password = "Password is required";
        } else {
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

            if (!passwordRegex.test(user.password)) {
                newErrors.password =
                    "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number";
            }
        }

        if (!user.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }


        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                email: user.email.trim(),
                password: user.password,
                name: user.name.trim(),
                role: user.role,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            console.log(data);
            toast.success("Registration successful!");

            e.target.reset();
            setErrors({});
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                    <div>
                        <input
                            type="text"
                            name="name"

                            placeholder="Full Name"

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

                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4 text-gray-500"
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

                            className="w-full px-4 py-3 border rounded-md outline-none focus:border-teal-600"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-4 text-gray-500"
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
                                    value="user"
                                    defaultChecked

                                />
                                User (Buyer)
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="artist"
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

                <button
                    onClick={handleGoogleSignIn}
                    className="mt-6 w-full flex items-center justify-center gap-3 border border-slate-300 rounded-md py-3 hover:bg-slate-50 transition"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

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