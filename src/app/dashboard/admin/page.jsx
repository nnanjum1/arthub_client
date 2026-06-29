"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaUsers,
    FaPalette,
    FaDollarSign,
    FaShoppingCart,
} from "react-icons/fa";

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalArtists: 0,
        artworksSold: 0,
        totalRevenue: 0,
    });

    const [salesData, setSalesData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [recentArtworks, setRecentArtworks] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`
                );

                const data = await res.json();

                setStats(data.stats);
                setSalesData(data.salesChart);
                setCategoryData(data.categoryChart);
                setRecentArtworks(data.recentArtworks);
                setRecentTransactions(data.recentTransactions);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="w-11/12 mx-auto py-10">
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-36 rounded-xl bg-gray-200 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor users, artworks and transactions.
                </p>
            </div>

            {/* Analytics Cards */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow border p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Total Users
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats.totalUsers}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-full bg-blue-100 flex justify-center items-center">

                            <FaUsers
                                className="text-blue-600 text-xl"
                            />

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Artists
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats.totalArtists}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-full bg-purple-100 flex justify-center items-center">

                            <FaPalette
                                className="text-purple-600 text-xl"
                            />

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Artworks Sold
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {stats.artworksSold}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-full bg-green-100 flex justify-center items-center">

                            <FaShoppingCart
                                className="text-green-600 text-xl"
                            />

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow border p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                Revenue
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ${stats.totalRevenue}
                            </h2>

                        </div>

                        <div className="w-14 h-14 rounded-full bg-yellow-100 flex justify-center items-center">

                            <FaDollarSign
                                className="text-yellow-600 text-xl"
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-6 mt-10">

                <div className="bg-white rounded-xl border shadow p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Sales Overview
                    </h2>

                    {/* Chart goes here */}

                </div>

                <div className="bg-white rounded-xl border shadow p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Artworks by Category
                    </h2>

                    {/* Pie chart goes here */}

                </div>

            </div>

            {/* Recent Artworks */}

            <div className="bg-white rounded-xl border shadow mt-10 p-6">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-semibold">
                        Recent Artworks
                    </h2>

                    <Link
                        href="/dashboard/admin/manage-artworks"
                        className="text-teal-600 font-medium hover:underline"
                    >
                        View All →
                    </Link>

                </div>

                {/* Table Part 2 */}

            </div>

            {/* Transactions */}

            <div className="bg-white rounded-xl border shadow mt-10 p-6">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-semibold">
                        Recent Transactions
                    </h2>

                    <Link
                        href="/dashboard/admin/transactions"
                        className="text-teal-600 font-medium hover:underline"
                    >
                        View All →
                    </Link>

                </div>

                {/* Table Part 3 */}

            </div>

        </div>
    );
};

export default AdminDashboard;