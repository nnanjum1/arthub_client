"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopArtists() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/top-artists`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => setArtists(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="mt-20">
            <h2 className="text-3xl text-center font-bold mb-8">
                Top Artists
            </h2>

            <div className="grid md:grid-cols-3 gap-6 w-[90%] mx-auto mb-5">
                {artists.map((artist) => (
                    <Link
                        key={artist.email}
                        href={`/artist/${artist.email}`}
                        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                    >
                        <img
                            src={artist.image || "/assets/avatar.png"}
                            alt={artist.name}
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                        />

                        <h3 className="text-xl font-semibold text-center mt-4">
                            {artist.name}
                        </h3>

                        <p className="text-center text-slate-500 mt-2">
                            {artist.totalSales} {artist.totalSales === 1 ? "Sale" : "Sales"}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}