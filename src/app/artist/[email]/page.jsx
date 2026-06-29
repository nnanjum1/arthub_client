"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";

export default function ArtistProfile() {
    const { email } = useParams();

    const [artist, setArtist] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artist/${decodeURIComponent(email)}`
                );

                const data = await res.json();

                setArtist(data.artist);
                setArtworks(data.artworks);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtist();
    }, [email]);

    if (loading) return <ArtworkSkeleton />;

    return (
        <div className="w-[90%] mx-auto py-10">

            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

                <div className="flex items-center gap-6">

                    <img
                        src={artist?.image || "/assets/avatar.png"}
                        alt={artist?.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-teal-500"
                    />

                    <div>
                        <h1 className="text-4xl font-bold">
                            {artist?.name}
                        </h1>

                        <p className="text-slate-500 mt-2">
                            {artist?.email}
                        </p>

                        <p className="mt-4 text-slate-600">
                            {artist?.bio || "No biography available."}
                        </p>
                    </div>

                </div>

            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Artworks
                </h2>

                <span className="text-slate-500">
                    {artworks.length} Artwork(s)
                </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {artworks.map((art) => (
                    <Link
                        key={art._id}
                        href={`/artwork/${art._id}`}
                        className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                    >
                        <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-64 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="font-semibold text-lg">
                                {art.title}
                            </h3>

                            <p className="text-slate-500 text-sm mt-1">
                                {art.category}
                            </p>

                            <p className="text-teal-600 font-bold mt-3">
                                ${art.price}
                            </p>
                        </div>
                    </Link>
                ))}

            </div>

        </div>
    );
}