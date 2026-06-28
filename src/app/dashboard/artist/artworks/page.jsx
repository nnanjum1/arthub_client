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
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artworks/${selectedId}`,
                { method: "DELETE" }
            );



            const data = await res.json();

            if (data.deletedCount > 0) {
                setArtworks((prev) =>
                    prev.filter((a) => a._id !== selectedId)
                );

                toast.success("Artwork deleted");
            }
        } catch (error) {
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

                    {artworks.map((art) => (
                        <div
                            key={art._id}
                            className="bg-white rounded-xl shadow overflow-hidden"
                        >

                            <img
                                src={art.image}
                                alt={art.title}
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-4 space-y-2">

                                <h2 className="text-lg font-semibold">
                                    {art.title}
                                </h2>

                                <p className="text-slate-500 text-sm">
                                    {art.category}
                                </p>

                                <p className="text-teal-600 font-bold">
                                    ${art.price}
                                </p>

                                <div className="flex gap-3 mt-4">

                                    <Link
                                        href={`/dashboard/artist/edit-artwork/${art._id}`}
                                        className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            openDeleteModal(art._id)
                                        }
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg"
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