"use client";

import React from "react";
import {
    FaPalette,
    FaDollarSign,
    FaShoppingCart,
    FaImage,
} from "react-icons/fa";

const ArtistDashboard = () => {
    return (
        <div className="p-6 w-[90%] mx-auto">

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
                                12
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
                                24
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
                                $1,250
                            </h2>
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
                                10
                            </h2>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                            <FaImage className="text-purple-600 text-xl" />
                        </div>
                    </div>
                </div>

            </div>


            <div className="mt-10 bg-white rounded-xl shadow-sm border p-6">

                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Recent Artworks
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">Title</th>
                                <th className="text-left py-3">Category</th>
                                <th className="text-left py-3">Price</th>
                                <th className="text-left py-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="py-3">Sunset Painting</td>
                                <td>Painting</td>
                                <td>$120</td>
                                <td>
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                        Active
                                    </span>
                                </td>
                            </tr>

                            <tr className="border-b">
                                <td className="py-3">Digital Nature</td>
                                <td>Digital Art</td>
                                <td>$90</td>
                                <td>
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                        Active
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-3">Abstract Colors</td>
                                <td>Abstract</td>
                                <td>$150</td>
                                <td>
                                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                                        Pending
                                    </span>
                                </td>
                            </tr>
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
                                <th className="text-left py-3">Buyer</th>
                                <th className="text-left py-3">Date</th>
                                <th className="text-left py-3">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="py-3">Sunset Painting</td>
                                <td>John Doe</td>
                                <td>24 Jun 2026</td>
                                <td>$120</td>
                            </tr>

                            <tr>
                                <td className="py-3">Digital Nature</td>
                                <td>Sarah Smith</td>
                                <td>22 Jun 2026</td>
                                <td>$90</td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    );
};

export default ArtistDashboard;