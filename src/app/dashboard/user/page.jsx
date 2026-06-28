"use client";

import Link from "next/link";
import {
    FaShoppingBag,
    FaImages,
    FaCrown,
    FaDollarSign,
} from "react-icons/fa";

const UserDashboard = () => {
    return (
        <div className="p-6">

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    User Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    View your purchases, manage your profile, and explore your collection.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Purchased Artworks
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                8
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
                                Purchase History
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                12
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <FaShoppingBag className="text-green-600 text-xl" />
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
                                $540
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                            <FaDollarSign className="text-yellow-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Current Plan
                            </p>

                            <h2 className="text-2xl font-bold mt-2">
                                Free
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                            <FaCrown className="text-purple-600 text-xl" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Recent Purchases */}
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

                            <tr className="border-b">
                                <td className="py-3">Ocean Dream</td>
                                <td>Sarah Khan</td>
                                <td>12 Jul 2026</td>
                                <td>$120</td>
                            </tr>

                            <tr className="border-b">
                                <td className="py-3">Sunset Hills</td>
                                <td>John Smith</td>
                                <td>08 Jul 2026</td>
                                <td>$95</td>
                            </tr>

                            <tr>
                                <td className="py-3">Abstract Flow</td>
                                <td>Emily Davis</td>
                                <td>02 Jul 2026</td>
                                <td>$180</td>
                            </tr>

                        </tbody>

                    </table>
                </div>

            </div>

            {/* Subscription & Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6 mt-10">

                <div className="bg-white border rounded-xl shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Subscription Overview
                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between items-center border rounded-lg p-4">
                            <div>
                                <h3 className="font-semibold">
                                    Free Plan
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Max 3 purchases
                                </p>
                            </div>

                            <span className="font-bold text-blue-600">
                                $0
                            </span>
                        </div>

                        <div className="flex justify-between items-center border rounded-lg p-4">
                            <div>
                                <h3 className="font-semibold">
                                    Pro
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Max 9 purchases
                                </p>
                            </div>

                            <span className="font-bold text-blue-600">
                                $9.99
                            </span>
                        </div>

                        <div className="flex justify-between items-center border rounded-lg p-4">
                            <div>
                                <h3 className="font-semibold">
                                    Premium
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Unlimited purchases
                                </p>
                            </div>

                            <span className="font-bold text-blue-600">
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