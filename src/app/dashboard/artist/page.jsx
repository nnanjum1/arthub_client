"use client";

import LoginCard from "@/app/components/Logincard";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
    FaPalette,
    FaDollarSign,
    FaShoppingCart,
    FaImage,
} from "react-icons/fa";


const ArtistDashboard = () => {


    const { data: session } = authClient.useSession();
    const email = session?.user?.email;

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        const fetchDashboard = async () => {


            try {

                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artist-dashboard/${email}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
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
    }, [email]);




    if (!session || session?.user?.role !== 'artist') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }
    return (
        <div className="w-[95%] mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    Artist Dashboard
                </h1>
                <p className="text-slate-500 mt-2">
                    Manage your artworks, track sales, and grow your portfolio.
                </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Artworks
                            </p>
                            <h2 className="text-3xl font-bold mt-2">
                                {dashboard?.totalArtworks || 0}
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                            <FaPalette className="text-teal-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Sales
                            </p>
                            <h2 className="text-3xl font-bold mt-2">
                                {dashboard?.totalSales || 0}
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaShoppingCart className="text-blue-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Revenue
                            </p>
                            <h2 className="text-3xl font-bold mt-2">
                                ${dashboard?.revenue || 0}                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <FaDollarSign className="text-green-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Active Listings
                            </p>
                            <h2 className="text-3xl font-bold mt-2">
                                {dashboard?.activeListings || 0}
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                            <FaImage className="text-purple-600 text-xl" />
                        </div>
                    </div>
                </div>

            </div>



            <div className="mt-10 bg-white rounded-2xl shadow-sm border p-6">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Recent Artworks
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your latest uploaded artworks
                        </p>
                    </div>

                    <Link
                        href="/dashboard/artist/artworks"
                        className="text-teal-600 font-semibold hover:text-teal-700"
                    >
                        View All →
                    </Link>

                </div>

                <div className="lg:hidden space-y-4">

                    {dashboard?.recentArtworks?.length === 0 ? (

                        <div className="text-center py-8 text-slate-500">
                            No artworks found.
                        </div>

                    ) : (

                        dashboard?.recentArtworks?.map((art) => (

                            <div
                                key={art._id}
                                className="border rounded-xl p-4"
                            >

                                <h3 className="font-semibold text-lg">
                                    {art.title}
                                </h3>

                                <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm">

                                    <span className="text-slate-500">
                                        Category
                                    </span>

                                    <span>{art.category}</span>

                                    <span className="text-slate-500">
                                        Price
                                    </span>

                                    <span className="font-semibold text-teal-600">
                                        ${art.price}
                                    </span>

                                    <span className="text-slate-500">
                                        Availability
                                    </span>

                                    <span
                                        className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold
                            ${art.availability === "Sold"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {art.availability}
                                    </span>

                                    <span className="text-slate-500">
                                        Status
                                    </span>

                                    <span
                                        className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold
                            ${art.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : art.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {art.status}
                                    </span>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                <div className="hidden lg:block overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-slate-600">

                                <th className="text-left py-4">Title</th>
                                <th className="text-left py-4">Category</th>
                                <th className="text-left py-4">Price</th>
                                <th className="text-left py-4">Availability</th>
                                <th className="text-left py-4">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {dashboard?.recentArtworks?.map((art) => (

                                <tr
                                    key={art._id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="py-4 font-medium">
                                        {art.title}
                                    </td>

                                    <td>{art.category}</td>

                                    <td className="font-semibold text-teal-600">
                                        ${art.price}
                                    </td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${art.availability === "Sold"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            {art.availability}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${art.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : art.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {art.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>


            <div className="mt-10 bg-white rounded-xl shadow-sm border p-6">

                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Recent Sales
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">Artwork</th>
                                <th className="text-left py-3 pl-2">Buyer</th>
                                <th className="text-left py-3"></th>
                                <th className="text-left py-3"></th>

                                <th className="text-left py-3">Amount</th>
                                <th className="text-left py-3"></th>

                                <th className="text-left pl-2 py-3">Date</th>

                            </tr>
                        </thead>

                        <tbody>
                            {dashboard?.recentSales?.map((sale) => (
                                <tr key={sale._id} className="border-b">
                                    <td className="py-3 ">{sale.artwork}</td>
                                    <td className="pl-2">{sale.buyer}  </td>
                                    <td className="text-left pl-2 py-3"></td>
                                    <td className="text-left py-3"></td>

                                    <td>${sale.amount}  </td>
                                    <td className="text-left py-3"></td>

                                    <td>
                                        {new Date(sale.date).toLocaleDateString()}
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

export default ArtistDashboard;