"use client";

import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import { authClient } from "@/lib/auth-client";
import { useEffect, useMemo, useState } from "react";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
    console.log(session)
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data: tokenData } = await authClient.token()

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                }
                );

                const data = await res.json();

                setTransactions(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = useMemo(() => {
        let filtered = [...transactions];

        if (search) {
            filtered = filtered.filter((item) =>
                item.buyerEmail?.toLowerCase().includes(search.toLowerCase()) ||
                item.artistEmail?.toLowerCase().includes(search.toLowerCase()) ||
                item.transactionId?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (typeFilter) {
            filtered = filtered.filter(
                (item) => item.type === typeFilter
            );
        }

        return filtered;
    }, [transactions, search, typeFilter]);

    if (!session || session?.user?.role !== 'admin') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Transactions
                </h1>

                <p className="text-slate-500 mt-2">
                    View all platform payments.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search email or transaction ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 flex-1"
                />

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="">All Types</option>
                    <option value="purchase">Purchase</option>
                    <option value="publishing fee">
                        Publishing Fee
                    </option>
                </select>

            </div>

            <div className="bg-white rounded-xl shadow border overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">
                                Transaction ID
                            </th>

                            <th className="text-left p-4">
                                Type
                            </th>

                            <th className="text-left p-4">
                                Buyer/User
                            </th>

                            <th className="text-left p-4">
                                Artist
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

                        {loading ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-10"
                                >
                                    <ArtworkSkeleton />
                                </td>
                            </tr>
                        ) : filteredTransactions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-10"
                                >
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="p-4">
                                        {item.transactionId}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${item.type === "purchase"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {item.type}
                                        </span>

                                    </td>

                                    <td className="p-4">
                                        {item.buyerEmail || "-"}
                                    </td>

                                    <td className="p-4">
                                        {item.artistEmail || "-"}
                                    </td>

                                    <td className="p-4 font-semibold text-teal-600">
                                        ${item.amount}
                                    </td>

                                    <td className="p-4">
                                        {item.paymentMethod}
                                    </td>

                                    <td className="p-4">

                                        <span className="text-green-600 font-semibold">
                                            {item.paymentStatus}
                                        </span>

                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            item.createdAt
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

export default Transactions;