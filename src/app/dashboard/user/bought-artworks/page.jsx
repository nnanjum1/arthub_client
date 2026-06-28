"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const BoughtArtWorks = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchPurchasedArtworks = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/purchase-history/${user.email}`
                );

                const data = await res.json();
                setArtworks(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedArtworks();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
            </div>
        );
    }

    return (
        <div className="w-[95%] lg:w-11/12 mx-auto py-8">

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Bought Artworks
                </h2>

                <p className="text-gray-500 mt-2">
                    Explore all artworks you've purchased.
                </p>
            </div>

            {artworks.length === 0 ? (

                <div className="bg-white rounded-xl shadow border p-16 text-center">

                    <h3 className="text-2xl font-semibold text-gray-700">
                        No Purchased Artworks
                    </h3>

                    <p className="text-gray-500 mt-3">
                        Purchased artworks will appear here.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {artworks.map((art) => (

                        <div
                            key={art._id}
                            className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden group"
                        >

                            <div className="overflow-hidden">

                                <img
                                    src={art.image}
                                    alt={art.artworkName}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                                />

                            </div>

                            <div className="p-5">

                                <h3 className="text-xl font-semibold line-clamp-1">
                                    {art.artworkName}
                                </h3>

                                <p className="text-gray-500 mt-1">
                                    by {art.artist}
                                </p>

                                <div className="flex justify-between items-center mt-5">

                                    <span className="font-bold text-teal-600">
                                        ${art.price}
                                    </span>

                                    <Link
                                        href={`/artwork/${art.artworkId}`}
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default BoughtArtWorks;