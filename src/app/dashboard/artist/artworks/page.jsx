"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "@/app/components/DeleteModal";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";

const ManageArtWorks = () => {
    const { data: session } = authClient.useSession();

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const user = session?.user;

    useEffect(() => {
        if (!user?.email) return;

        const fetchArtworks = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artworks/artist/${user.email}`
                );

                const data = await res.json();
                setArtworks(data);
            } catch (error) {
                toast.error("Failed to load artworks");
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [user]);

    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artworks/${selectedId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message || "Delete failed");
            }

            if (data.deletedCount > 0) {
                setArtworks((prev) =>
                    prev.filter((a) => a._id !== selectedId)
                );

                toast.success("Artwork deleted");
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        } finally {
            setShowDeleteModal(false);
            setSelectedId(null);
        }
    };

    if (loading) {
        return (
            <div className="p-6">

                <div className="flex justify-between mb-6">
                    <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-10 w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <ArtworkSkeleton key={i} />
                    ))}
                </div>

            </div>
        );
    }

    return (
        <div className="w-[90%] mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Your Artworks
            </h1>




            {artworks.length === 0 ? (
                <p>No artworks found</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                    {artworks.map((artwork) => (
                        <div
                            key={artwork._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
                        >
                            <Link href={`/artwork/${artwork._id}`}>

                                <img
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-4">

                                    <h2 className="text-lg font-semibold line-clamp-1">
                                        {artwork.title}
                                    </h2>

                                    <p className="text-slate-500 text-sm mt-1">
                                        {artwork.category}
                                    </p>

                                    <p className="text-teal-600 font-bold text-lg mt-2">
                                        ${artwork.price}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-3">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                        ${artwork.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : artwork.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {artwork.status}
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                        ${artwork.availability === "Sold"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {artwork.availability}
                                        </span>

                                    </div>

                                </div>

                            </Link>

                            <div className="px-4 pb-4 mt-auto">

                                <div className="grid grid-cols-2 gap-3">

                                    <Link
                                        href={`/dashboard/artist/edit-artwork/${artwork._id}`}
                                        className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => openDeleteModal(artwork._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />

        </div>
    );
};

export default ManageArtWorks;