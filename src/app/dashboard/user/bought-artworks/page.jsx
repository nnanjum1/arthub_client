"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";

const BoughtArtWorks = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchPurchasedArtworks = async () => {

            try {
                const { data: tokenData } = await authClient.token()
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/purchase-history/${user.email}`,
                    {

                        headers: {
                            "Content-Type": "application/json",
                            'authorization': `Bearer ${tokenData?.token}`
                        },
                    }
                )

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
                <ArtworkSkeleton />            </div>
        );
    }

    if (!session || session?.user?.role !== 'user') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }

    return (
        <div>
            {artworks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-2xl font-bold text-gray-700">
                        No artworks bought yet
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Start exploring and purchase amazing artworks.
                    </p>

                    <Link
                        href="/browse"
                        className="mt-5 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                        Browse Artworks
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {artworks.map((art) => (
                        <Link
                            key={art._id}
                            href={`/artwork/${art.artworkId}`}
                            className="group relative overflow-hidden rounded-2xl shadow-lg"
                        >
                            <img
                                src={art.image}
                                alt={art.artworkName}
                                className="w-full aspect-square object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300"></div>

                            <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition duration-300">
                                <h3 className="text-white font-semibold text-lg truncate">
                                    {art.artworkName}
                                </h3>

                                <p className="text-gray-200 text-sm">
                                    {art.artist}
                                </p>

                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-teal-300 font-bold">
                                        ${art.price}
                                    </span>

                                    <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                                        Purchased
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoughtArtWorks;