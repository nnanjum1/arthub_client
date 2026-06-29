"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ArtworkSkeleton from "../components/ArtworkSkeleton";
import { useSearchParams } from "next/navigation";

const BrowseArtworks = () => {


    const searchParams = useSearchParams();
    const artCategory = searchParams.get("category");
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sort, setSort] = useState("");



    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artworks`);
                const data = await res.json();

                setArtworks(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);


    useEffect(() => {
        if (artCategory) {
            setCategory(artCategory);
        }
    }, [artCategory]);

    const filteredArtworks = useMemo(() => {
        let filtered = [...artworks];


        if (search) {
            filtered = filtered.filter(
                (art) =>
                    art.title
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    art.artistName
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
            );
        }


        if (category) {
            filtered = filtered.filter(
                (art) => art.category === category
            );
        }


        filtered = filtered.filter(
            (art) => Number(art.price) <= Number(maxPrice)
        );


        if (sort === "low-high") {
            filtered.sort((a, b) => a.price - b.price);
        }

        if (sort === "high-low") {
            filtered.sort((a, b) => b.price - a.price);
        }

        if (sort === "newest") {
            filtered.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );
        }

        return filtered;
    }, [artworks, search, category, maxPrice, sort]);

    return (
        <div className="w-[95%] mx-auto py-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Browse Artworks
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Discover amazing artwork from talented artists
                    </p>
                </div>

                <div className="w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search artwork or artist..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

            </div>
            <div className="flex flex-col md:flex-row gap-3 mb-8">

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg px-4 py-2.5 bg-white"
                >
                    <option value="">All Categories</option>
                    <option value="Painting">Painting</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Sketch">Sketch</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Calligraphy">Calligraphy</option>
                </select>

                <div className="flex items-center gap-3 px-4 border rounded-lg bg-white min-w-18">
                    <span className="text-sm text-slate-500 whitespace-nowrap">
                        Max Price
                    </span>

                    <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full accent-teal-600"
                    />

                    <span className="font-medium text-teal-600">
                        ${maxPrice}
                    </span>
                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded-lg px-4 py-2.5 bg-white"
                >
                    <option value="">Sort By</option>
                    <option value="newest">Newest</option>
                    <option value="low-high">Price Low → High</option>
                    <option value="high-low">Price High → Low</option>
                </select>

            </div>


            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <ArtworkSkeleton key={i} />
                    ))}
                </div>
            )}

            {!loading && filteredArtworks.length === 0 && (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold">
                        No artworks found
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Try changing your search or filters.
                    </p>
                </div>
            )}


            {!loading && filteredArtworks.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                    {filteredArtworks.map((artwork) => (
                        <Link
                            key={artwork._id}
                            href={`/artwork/${artwork._id}`}
                            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="w-full h-56 object-center"
                            />

                            <div className="p-4">

                                <h2 className="font-semibold text-lg line-clamp-1">
                                    {artwork.title}
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    By {artwork.artistName}
                                </p>

                                <p className="text-teal-600 font-bold mt-3 text-lg">
                                    ${artwork.price}
                                </p>

                            </div>
                        </Link>
                    ))}

                </div>
            )}

        </div>
    );


};

export default BrowseArtworks;
