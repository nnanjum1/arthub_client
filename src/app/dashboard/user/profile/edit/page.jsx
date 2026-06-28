"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const EditProfile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState(user?.name || "");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    // Regex: 6+ chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    // =========================
    // UPDATE NAME
    // =========================
    const handleNameUpdate = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/name/${user.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to update name");
                return;
            }

            toast.success("Name updated successfully");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // CHANGE PASSWORD
    // =========================
    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            toast.error(
                "Password must be 6+ chars, include uppercase, lowercase, and number"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/change-password/${user.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Password update failed");
                return;
            }

            toast.success("Password updated successfully");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-600">
                    Please login to edit profile
                </h2>
            </div>
        );
    }

    return (
        <div className="w-[90%] lg:w-1/2 mx-auto py-10">

            <h1 className="text-2xl font-bold mb-6">
                Edit Profile
            </h1>

            {/* ================= NAME CARD ================= */}
            <div className="bg-white border rounded-xl shadow p-5 mb-6">

                <h2 className="text-lg font-semibold mb-3">
                    Update Name
                </h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your name"
                />

                <button
                    onClick={handleNameUpdate}
                    disabled={loading}
                    className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg"
                >
                    Save Name
                </button>

            </div>

            {/* ================= PASSWORD CARD ================= */}
            <div className="bg-white border rounded-xl shadow p-5">

                <h2 className="text-lg font-semibold mb-3">
                    Change Password
                </h2>

                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full border p-3 rounded-lg mb-3"
                />

                {/* Rules */}
                <div className="text-sm text-gray-500 mb-4">
                    <p className="font-medium">Password rules:</p>
                    <ul className="list-disc ml-5 mt-1">
                        <li>At least 6 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                    </ul>
                </div>

                <button
                    onClick={handlePasswordChange}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Change Password
                </button>

            </div>

        </div>
    );
};

export default EditProfile;