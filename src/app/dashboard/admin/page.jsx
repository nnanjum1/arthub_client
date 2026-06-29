"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaUsers,
    FaPalette,
    FaDollarSign,
    FaShoppingCart,
} from "react-icons/fa";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LabelList,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import { authClient } from "@/lib/auth-client";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import LoginCard from "@/app/components/Logincard";

const AdminDashboard = () => {
    const { data: session } = authClient.useSession();

    const [loading, setLoading] = useState(true);

    const colors = [
        "#14b8a6",
        "#8b5cf6",
        "#3b82f6",
        "#f97316",
        "#10b981",
        "#ef4444",
    ];

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

    const chartData = Array.isArray(salesData)
        ? salesData.map((item) => ({
            month: new Date(
                2026,
                item?._id?.month - 1
            ).toLocaleString("default", {
                month: "short",
            }),
            total: item?.total || 0,
        }))
        : [];

    useEffect(() => {
        if (!session) {
            setLoading(false);
            return;
        }

        const fetchDashboard = async () => {
            try {
                setLoading(true);

                const { data: tokenData } = await authClient.token();

                if (!tokenData?.token) {
                    console.log("No JWT token found.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${tokenData.token}`,
                        },
                    }
                );

                if (!res.ok) {
                    console.log("Dashboard Error:", res.status);

                    setStats({
                        totalUsers: 0,
                        totalArtists: 0,
                        artworksSold: 0,
                        totalRevenue: 0,
                    });

                    setSalesData([]);
                    setCategoryData([]);
                    setRecentArtworks([]);
                    setRecentTransactions([]);

                    return;
                }

                const data = await res.json();

                console.log(data);

                setStats(
                    data.stats || {
                        totalUsers: 0,
                        totalArtists: 0,
                        artworksSold: 0,
                        totalRevenue: 0,
                    }
                );

                setSalesData(
                    Array.isArray(data.salesChart)
                        ? data.salesChart
                        : []
                );

                setCategoryData(
                    Array.isArray(data.categoryChart)
                        ? data.categoryChart
                        : []
                );

                setRecentArtworks(
                    Array.isArray(data.recentArtworks)
                        ? data.recentArtworks
                        : []
                );

                setRecentTransactions(
                    Array.isArray(data.recentTransactions)
                        ? data.recentTransactions
                        : []
                );

            } catch (err) {
                console.error(err);

                setSalesData([]);
                setCategoryData([]);
                setRecentArtworks([]);
                setRecentTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();

    }, [session]);

    if (!session || session.user?.role !== "admin") {
        return <LoginCard />;
    }
    if (loading) {
        return (
            <div className="w-11/12 mx-auto py-10">
                <ArtworkSkeleton />
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



            <div className="grid lg:grid-cols-2 gap-6 mt-10">

                <div className="bg-white rounded-xl border shadow p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Sales Overview
                    </h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart
                            data={chartData}
                            barSize={30} // Reduce width
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="month"
                                label={{
                                    value: "Month",
                                    position: "insideBottom",
                                    offset: -5,
                                }}
                            />

                            <YAxis
                                label={{
                                    value: "Revenue ($)",
                                    angle: -90,
                                    position: "insideLeft",
                                }}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="total"
                                fill="#14b8a6"
                                radius={[8, 8, 0, 0]}
                            >
                                <LabelList
                                    dataKey="total"
                                    position="top"
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-xl border shadow p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Artworks by Category
                    </h2>

                    <PieChart width={350} height={300}>
                        <Pie
                            data={categoryData}
                            dataKey="count"
                            nameKey="_id"
                            outerRadius={100}
                            label
                        >
                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </div>

            </div>



            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-10 p-6">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Recent Artworks
                        </h2>

                        <p className="text-sm text-slate-500">
                            Latest artworks submitted by artists
                        </p>
                    </div>

                    <Link
                        href="/dashboard/admin/manage-artworks"
                        className="text-teal-600 font-semibold hover:text-teal-700 transition"
                    >
                        View All →
                    </Link>

                </div>

                <div className="lg:hidden space-y-4">

                    {recentArtworks.length === 0 ? (

                        <div className="text-center py-10 text-slate-500">
                            No artworks found.
                        </div>

                    ) : (

                        recentArtworks.slice(0, 5).map((item) => (

                            <div
                                key={item._id}
                                className="border rounded-xl p-4 shadow-sm"
                            >

                                <div className="flex gap-3">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-semibold text-slate-800">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {item.artistName}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-3">

                                            <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                                                {item.category}
                                            </span>

                                            <span className="text-teal-600 font-semibold">
                                                ${item.price}
                                            </span>

                                        </div>

                                        <div className="mt-3">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${item.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>


                <div className="hidden lg:block overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-left text-sm text-slate-500">

                                <th className="pb-4">Artwork</th>
                                <th className="pb-4">Artist</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Price</th>
                                <th className="pb-4 text-center">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {recentArtworks.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-slate-500"
                                    >
                                        No artworks found.
                                    </td>
                                </tr>

                            ) : (

                                recentArtworks.slice(0, 5).map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border-b last:border-none hover:bg-slate-50 transition"
                                    >

                                        <td className="py-4">

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-14 h-14 rounded-xl object-cover border"
                                                />

                                                <div>
                                                    <h3 className="font-semibold text-slate-800">
                                                        {item.title}
                                                    </h3>


                                                </div>

                                            </div>

                                        </td>

                                        <td className="text-slate-700">
                                            {item.artistName}
                                        </td>

                                        <td>
                                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                                                {item.category}
                                            </span>
                                        </td>

                                        <td className="font-semibold text-teal-600">
                                            ${item.price}
                                        </td>

                                        <td className="text-center">

                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



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
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">Buyer</th>
                                <th className="text-left py-3">Artwork</th>
                                <th className="text-left py-3">Amount</th>
                                <th className="text-left py-3">Status</th>
                                <th className="text-left py-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentTransactions.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b"
                                >
                                    <td className="py-3">
                                        {item.buyerEmail}
                                    </td>

                                    <td>
                                        {item.artworkTitle}
                                    </td>

                                    <td>
                                        ${item.amount}
                                    </td>

                                    <td>
                                        <span className="text-green-600 font-semibold">
                                            {item.paymentStatus}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>

        </div>
    );
};

export default AdminDashboard;