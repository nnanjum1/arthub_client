"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Dynamic = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestArtworks = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artworks`);
                if (res.ok) {
                    const data = await res.json();

                    if (data && Array.isArray(data)) {
                        setArtworks(data.slice(0, 6));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch the featured artworks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestArtworks();
    }, []);

    if (loading) {
        return (
            <div className="w-[90%] mx-auto py-16">
                <div className="h-8 bg-slate-200 w-48 rounded mb-12 mx-auto animate-pulse"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="space-y-4">
                            <div className="bg-slate-200 aspect-square rounded-xl w-full"></div>
                            <div className="h-4 bg-slate-200 w-3/4 rounded"></div>
                            <div className="h-4 bg-slate-200 w-1/2 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (artworks.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-slate-50 border-b border-slate-100">
            <div className="w-[90%] mx-auto">

                <div className="text-center mb-12 space-y-2">
                    <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                        Marketplace Arrivals
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Featured Artworks
                    </h2>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Explore original digital and canvas creations freshly compiled from our local and global community.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {artworks.map((item) => (
                        <Link
                            href={`/artwork/${item._id}`}
                            key={item._id}
                            className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="overflow-hidden rounded-xl bg-slate-100 aspect-square relative w-full mb-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                />
                                {item.availability === "sold" && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                                        Sold
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-sm md:text-base font-bold text-slate-800 tracking-tight line-clamp-1 group-hover:text-teal-600 transition-colors duration-200 break-all">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium line-clamp-1">
                                        By {item.artistName}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-50 flex items-center justify-between mt-2">
                                    <span className="text-base font-black text-teal-600">
                                        ${item.price}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/browse"
                        className="inline-block border border-slate-300 text-slate-700 bg-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-98 shadow-sm"
                    >
                        View All Artworks
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default Dynamic;