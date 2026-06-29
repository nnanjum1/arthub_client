"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Logincard from "@/app/components/Logincard";

const SalesHistory = () => {
    const { data: session } = authClient.useSession();

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artist/sales`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );

                const data = await res.json();

                setSales(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.role === "artist") {
            fetchSales();
        }
    }, [session]);

    const filteredSales = useMemo(() => {
        return sales.filter(
            (sale) =>
                sale.artworkTitle
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                sale.buyerEmail
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
        );
    }, [sales, search]);

    const totalRevenue = sales.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
    );

    if (!session || session?.user?.role !== "artist") {
        return (
            <div>
                <Logincard />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="w-11/12 mx-auto py-10 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-8">

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        Sales History
                    </h1>

                    <p className="text-slate-500 mt-2">
                        View all artwork sales.
                    </p>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-xl px-6 py-4">
                    <p className="text-sm text-slate-500">
                        Total Earnings
                    </p>

                    <h2 className="text-3xl font-bold text-teal-600">
                        ${totalRevenue.toFixed(2)}
                    </h2>
                </div>

            </div>

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search artwork or buyer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full md:w-96"
                />

            </div>

            <div className="bg-white rounded-xl border shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">
                                Artwork
                            </th>

                            <th className="text-left p-4">
                                Buyer
                            </th>

                            <th className="text-left p-4">
                                Amount
                            </th>

                            <th className="text-left p-4">
                                Payment
                            </th>

                            <th className="text-left p-4">
                                Status
                            </th>

                            <th className="text-left p-4">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredSales.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-10"
                                >
                                    No sales found.
                                </td>
                            </tr>
                        ) : (
                            filteredSales.map((sale) => (
                                <tr
                                    key={sale._id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="p-4">
                                        {sale.artworkTitle}
                                    </td>

                                    <td className="p-4">
                                        {sale.buyerEmail}
                                    </td>

                                    <td className="p-4 font-semibold text-teal-600">
                                        ${sale.amount}
                                    </td>

                                    <td className="p-4">
                                        {sale.paymentMethod}
                                    </td>

                                    <td className="p-4">

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {sale.paymentStatus}
                                        </span>

                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            sale.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default SalesHistory;