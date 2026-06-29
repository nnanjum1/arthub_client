"use client";

import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaShoppingBag,
    FaImages,
    FaCrown,
    FaDollarSign,
} from "react-icons/fa";

const UserDashboard = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [dashboard, setDashboard] = useState({
        totalPurchased: 0,
        totalTransactions: 0,
        totalSpent: 0,
        subscriptionTier: "Free",
        recentPurchases: [],
    });
    const [loading, setLoading] = useState(true);
    const [recentPurchase, setRecentPurchase] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        const fetchDashboard = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/user/${user.email}`
                );

                const data = await res.json();

                setDashboard(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [user]);

    useEffect(() => {
        if (!user?.email) return;

        const fetchRecentPurchase = async () => {
            const { data: tokenData } = await authClient.token()

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/purchase-history/${user.email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                }
                );

                const data = await res.json();

                setRecentPurchase(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecentPurchase();
    }, [user]);


    if (loading) {
        return (
            <div className="p-10 text-center">
                <ArtworkSkeleton />
            </div>
        );

    }

    if (!session || session?.user?.role !== 'user') {
        return (
            <div className="w-[90%] mx-auto bg-white p-6 rounded-xl shadow">
                <LoginCard />
            </div>
        );
    }


    return (
        <div className="p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    User Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    View your purchases, manage your profile, and explore your collection.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Purchased Artworks
                            </p>
                            <h2 className="text-3xl font-bold mt-2">
                                {dashboard?.totalPurchased || 0}
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaImages className="text-blue-600 text-xl" />
                        </div>
                    </div>
                </div>



                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Spent
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ${dashboard?.totalSpent || 0}
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                            <FaDollarSign className="text-yellow-600 text-xl" />
                        </div>
                    </div>
                </div>



            </div>

            <div className="mt-10 bg-white border rounded-xl shadow-sm p-6">

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold">
                        Recent Purchases
                    </h2>

                    <Link
                        href="/dashboard/user/purchase-history"
                        className="text-blue-600 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">Artwork</th>
                                <th className="text-left py-3">Artist</th>
                                <th className="text-left py-3">Date</th>
                                <th className="text-left py-3">Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentPurchase.length > 0 ? (
                                recentPurchase.slice(0, 5).map((purchase) => (
                                    <tr key={purchase._id} className="border-b">
                                        <td className="py-3">
                                            {purchase.artworkName}
                                        </td>

                                        <td>
                                            {purchase.artist}
                                        </td>

                                        <td>
                                            {new Date(
                                                purchase.purchaseDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="font-semibold text-teal-600">
                                            ${purchase.price}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No purchases yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-10">

                <div className="bg-white border rounded-xl shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Subscription Overview
                    </h2>
                    <div className="space-y-4">

                        {/* Free Plan */}
                        <div
                            className={`border rounded-lg p-4 flex justify-between items-center transition
        ${dashboard?.subscriptionTier?.toLowerCase() === "free"
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Free Plan</h3>

                                    {dashboard?.subscriptionTier?.toLowerCase() === "free" && (
                                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                            Current Plan
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-slate-500">
                                    Max 3 purchases
                                </p>
                            </div>

                            <span className="font-bold text-blue-600">
                                $0
                            </span>
                        </div>

                        {/* Pro Plan */}
                        <div
                            className={`border rounded-lg p-4 flex justify-between items-center transition
        ${dashboard?.subscriptionTier?.toLowerCase() === "pro"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Pro</h3>

                                    {dashboard?.subscriptionTier?.toLowerCase() === "pro" && (
                                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                                            Current Plan
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-slate-500">
                                    Max 9 purchases
                                </p>
                            </div>

                            <span className="font-bold text-green-600">
                                $9.99
                            </span>
                        </div>

                        {/* Premium Plan */}
                        <div
                            className={`border rounded-lg p-4 flex justify-between items-center transition
        ${dashboard?.subscriptionTier?.toLowerCase() === "premium"
                                    ? "border-purple-500 bg-purple-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Premium</h3>

                                    {dashboard?.subscriptionTier?.toLowerCase() === "premium" && (
                                        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                                            Current Plan
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-slate-500">
                                    Unlimited purchases
                                </p>
                            </div>

                            <span className="font-bold text-purple-600">
                                $19.99
                            </span>
                        </div>

                    </div>

                </div>

                <div className="bg-white border rounded-xl shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Quick Actions
                    </h2>

                    <div className="grid gap-4">

                        <Link
                            href="/browse"
                            className="bg-blue-600 text-white rounded-lg px-5 py-3 hover:bg-blue-700 transition text-center"
                        >
                            Browse Artworks
                        </Link>

                        <Link
                            href="/dashboard/user/bought-artworks"
                            className="bg-slate-100 hover:bg-slate-200 rounded-lg px-5 py-3 text-center"
                        >
                            View My Collection
                        </Link>

                        <Link
                            href="/dashboard/user/profile"
                            className="bg-slate-100 hover:bg-slate-200 rounded-lg px-5 py-3 text-center"
                        >
                            Edit Profile
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserDashboard;