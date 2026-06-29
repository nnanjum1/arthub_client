"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";

const PurchaseHistory = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user) return;

        const fetchHistory = async () => {
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

                setHistory(data);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();

    }, [user]);

    if (loading) {
        return (
            <div className="text-center py-10">
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
        <div className="w-[95%] lg:w-11/12 mx-auto py-8">

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

                <div className="px-6 py-5 border-b">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Purchase History
                    </h2>
                    <p className="text-gray-500 mt-1">
                        View all the artworks you've purchased.
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100 text-gray-700">

                            <tr>
                                <th className="px-5 py-4 text-left">#</th>
                                <th className="px-5 py-4 text-left">Artwork</th>
                                <th className="px-5 py-4 text-left">Artist</th>
                                <th className="px-5 py-4 text-left">Price</th>
                                <th className="px-5 py-4 text-left">Purchase Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {history.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-12 text-gray-500"
                                    >
                                        No purchases yet.
                                    </td>
                                </tr>

                            ) : (

                                history.map((item, index) => (

                                    <tr
                                        key={item._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="px-5 py-4 font-medium">
                                            {index + 1}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="items-center gap-4">

                                                <img
                                                    src={item.image}
                                                    alt={item.artworkName}
                                                    className="w-16 h-16 rounded-lg object-cover border"
                                                />

                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        {item.artworkName}
                                                    </h3>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4 text-gray-700">
                                            {item.artist}
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-teal-600">
                                            ${item.price}
                                        </td>

                                        <td className="px-5 py-4 text-gray-600">
                                            {new Date(item.purchaseDate).toLocaleDateString()}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default PurchaseHistory;