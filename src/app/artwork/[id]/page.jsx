"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import DeleteModal from "@/app/components/DeleteModal";

const ArtworkDetails = () => {
    const { id } = useParams();
    const router = useRouter();

    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { data: session } = authClient.useSession();

    const user = session?.user;

    const [showLoginCard, setShowLoginCard] = useState(false);
    const isOwner =
        user?.email === artwork?.artistEmail;
    const isArtist = user?.role === "artist";

    const handlePurchase = async () => {
        if (!user) {
            setShowLoginCard(true);
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        artworkId: artwork._id,
                        buyerEmail: user.email,
                    }),
                }
            );

            const data = await res.json();

            window.location.href = data.checkoutUrl;
        } catch (error) {
            toast.error("Failed to start payment");
        }
    };

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}`
                );

                if (!res.ok) {
                    throw new Error("Artwork not found");
                }

                const data = await res.json();
                setArtwork(data);
            } catch (error) {
                toast.error("Failed to load artwork");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
    }, [id]);

    if (loading) {
        return <ArtworkSkeleton />;
    }

    if (!artwork) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <h2 className="text-2xl font-semibold">
                    Artwork Not Found
                </h2>
            </div>
        );
    }


    const handleDelete = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artworks/${artwork._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success("Artwork deleted successfully");

                setShowDeleteModal(false);

                router.push("/browse");
            } else {
                toast.error("Failed to delete artwork");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-[90%] mx-auto py-10">

            <div className="grid md:grid-cols-2 gap-10">

                <div>
                    <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-100 object-center rounded-2xl shadow-md"
                    />
                </div>

                <div className="space-y-4">

                    <h1 className="text-4xl font-bold">
                        {artwork.title}
                    </h1>

                    <p>
                        Artist:
                        <Link
                            href={`/artist/${artwork.artistEmail}`}
                            className="ml-2 text-teal-600 hover:underline"
                        >
                            {artwork.artistName}
                        </Link>
                    </p>

                    <p>
                        Category:
                        <span className="font-medium ml-2">
                            {artwork.category}
                        </span>
                    </p>

                    <p>
                        Uploaded:
                        <span className="ml-2">
                            {new Date(
                                artwork.createdAt
                            ).toLocaleDateString()}
                        </span>
                    </p>

                    <h2 className="text-3xl font-bold text-teal-600">
                        ${artwork.price}
                    </h2>
                    <p>{artwork.availability}</p>

                    <div className="mt-8">

                        <h3 className="text-xl font-semibold mb-3">
                            Description
                        </h3>

                        <p className="text-slate-600 leading-7">
                            {artwork.description}
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">

                        <button
                            onClick={handlePurchase}
                            disabled={isArtist}
                            className={`px-6 py-3 rounded-lg text-white transition
        ${isArtist
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-teal-600 hover:bg-teal-700"
                                }`}
                        >
                            Purchase Artwork
                        </button>
                        {
                            showLoginCard && (
                                <div className="w-full border border-teal-200 bg-teal-50 rounded-xl p-5 mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        Login Required
                                    </h3>

                                    <p className="text-slate-600 mt-2">
                                        You need to login before purchasing this artwork.
                                    </p>

                                    <div className="flex gap-3 mt-4">
                                        <Link
                                            href={`/login?redirect=/artwork/${id}`}
                                            className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700"
                                        >
                                            Login
                                        </Link>

                                        <button
                                            onClick={() => setShowLoginCard(false)}
                                            className="border px-5 py-2 rounded-lg hover:bg-slate-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        {isOwner && (
                            <div className="flex gap-3">
                                <Link
                                    href={`/dashboard/artist/edit-artwork/${artwork._id}`}
                                    className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Edit Artwork
                                </Link>

                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="bg-pink-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Delete Artwork
                                </button>
                            </div>
                        )}

                    </div>

                </div>







            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />

        </div>


    );


};

export default ArtworkDetails;