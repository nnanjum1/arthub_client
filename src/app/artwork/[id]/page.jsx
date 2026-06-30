"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import DeleteModal from "@/app/components/DeleteModal";

const ArtworkDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const [artist, setArtist] = useState(null);
    const [comments, setComments] = useState([]);
    const [showUpgradeCard, setShowUpgradeCard] = useState(false);
    const [upgradeMessage, setUpgradeMessage] = useState("");
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { data: session } = authClient.useSession();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [canComment, setCanComment] = useState(false);
    const [comment, setComment] = useState("");
    const user = session?.user;
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    const [showLoginCard, setShowLoginCard] = useState(false);
    const isOwner = user?.email === artwork?.artistEmail;
    const isArtist = user?.role === "artist";
    const isAdmin = user?.role === "admin";

    const handleCommentUpdate = async (commentId) => {
        if (!editCommentText.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            const { data } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${data.token}`,
                    },
                    body: JSON.stringify({
                        comment: editCommentText,
                    }),
                }
            );

            const result = await res.json();

            if (res.ok) {
                toast.success("Comment updated");
                setEditingCommentId(null);
                setEditCommentText("");
                fetchComments();
            } else {
                toast.error(result.message || "Failed to update");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}/comments`
            );
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [id]);

    const handlePurchase = async () => {
        if (!user) {
            setShowLoginCard(true);
            return;
        }

        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                    body: JSON.stringify({
                        artworkId: artwork._id,
                        buyerEmail: user.email,
                    }),
                }
            );

            const data = await res.json();
            console.log("Artwork API Response:", data);

            if (res.status === 403) {
                setUpgradeMessage(data.message);
                setShowUpgradeCard(true);
                return;
            }

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            if (!data.checkoutUrl) {
                toast.error("Checkout URL not found.");
                return;
            }

            window.location.assign(data.checkoutUrl);
        } catch (error) {
            console.error(error);
            toast.error("Failed to start payment.");
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

                const artistRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${encodeURIComponent(data.artistEmail)}`
                );

                if (artistRes.ok) {
                    const artistData = await artistRes.json();
                    setArtist(artistData);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load artwork");
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
        fetchComments();
    }, [id, fetchComments]);

    const handleDelete = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
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

    useEffect(() => {
        if (!session) return;

        const checkCommentPrivileges = async () => {
            try {
                const { data } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}/can-comment`,
                    {
                        headers: {
                            authorization: `Bearer ${data.token}`
                        }
                    }
                );

                const result = await res.json();
                setCanComment(result.canComment);
            } catch (error) {
                console.error("Error checking comment eligibility:", error);
            }
        };

        checkCommentPrivileges();
    }, [id, session]);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const { data } = await authClient.token();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${data.token}`
                },
                body: JSON.stringify({ comment })
            }
        );

        if (res.ok) {
            toast.success("Comment added");
            setComment("");
            fetchComments();
        }
    };

    const handleCommentDelete = async () => {
        if (!deletingCommentId) return;

        try {
            const { data } = await authClient.token();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/comments/${deletingCommentId}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${data.token}`,
                    },
                }
            );

            if (res.ok) {
                toast.success("Comment deleted");
                fetchComments();
            } else {
                const errData = await res.json();
                toast.error(errData.message || "Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast.error("Something went wrong");
        } finally {
            setDeletingCommentId(null); // Clear state to close the card
        }
    };

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

    const isSold = artwork.availability === "Sold";

    return (
        <div className="w-[90%] mx-auto py-10">


            {showUpgradeCard && (
                <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
                    <h3 className="text-lg font-semibold text-yellow-700">
                        Purchase Limit Reached
                    </h3>
                    <p className="mt-2 text-slate-700">
                        {upgradeMessage || "You have reached the maximum number of purchases allowed by your current subscription."}
                    </p>
                    <div className="mt-4 flex gap-3">
                        <Link
                            href="/dashboard/user/subscription"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Upgrade Plan
                        </Link>
                        <button
                            onClick={() => setShowUpgradeCard(false)}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-100 object-center rounded-2xl shadow-md"
                    />
                </div>

                <div className="space-y-4 w-[80%]">
                    <h1 className="text-4xl font-bold">
                        {artwork.title}
                    </h1>

                    <p>
                        Artist:
                        <Link
                            href={`/artist/${encodeURIComponent(artwork.artistEmail)}`}
                            className="text-teal-600 font-semibold hover:text-teal-700 hover:underline ml-1"
                        >
                            {artist?.name || artwork.artistName || "Unknown Artist"}
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
                            {new Date(artwork.createdAt).toLocaleDateString()}
                        </span>
                    </p>

                    <h2 className="text-3xl font-bold text-teal-600">
                        ${artwork.price}
                    </h2>

                    <p
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                        ${artwork.availability === "Sold"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-green-100 text-green-700 border border-green-200"
                            }`}
                    >
                        {artwork.availability === "Sold" ? "Sold" : "● Available"}
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-8">
                        Description
                    </h3>

                    <p className="text-slate-600 leading-7">
                        {artwork.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">
                        <button
                            onClick={handlePurchase}
                            disabled={isArtist || isSold || isAdmin}
                            className={`px-6 py-3 rounded-lg text-white transition
                            ${isArtist || isSold || isAdmin
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-teal-600 hover:bg-teal-700"
                                }`}
                        >
                            Purchase Artwork
                        </button>

                        {showLoginCard && (
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
                        )}

                        {isOwner && isArtist && (
                            <div className="flex gap-3 w-full mt-2">
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

                    {canComment && (
                        <form onSubmit={handleComment} className="mt-8 space-y-3">
                            <h3 className="text-xl font-semibold">Add a Comment</h3>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                rows={4}
                                placeholder="Write your thoughts about this artwork..."
                            />
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Comment
                            </button>
                        </form>
                    )}

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
                        {comments.map((item) => {
                            const canDeleteComment = isAdmin || (user && (user.email === item.userEmail || user.id === item.userId));

                            return (
                                <div
                                    key={item._id}
                                    className="border rounded-lg p-4 mb-3 bg-slate-50 relative group"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.userImage || "/assets/avatar.png"}
                                                alt={item.userName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-medium text-slate-800">
                                                    {item.userEmail || "Anonymous"}
                                                </h4>
                                                <small className="text-slate-400">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                        </div>

                                        {canDeleteComment && (
                                            <div className="flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingCommentId(item._id);
                                                        setEditCommentText(item.comment);
                                                        setDeletingCommentId(null);
                                                    }}
                                                    className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded hover:bg-blue-600 hover:text-white"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setDeletingCommentId(item._id);
                                                        setEditingCommentId(null);
                                                    }}
                                                    className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {deletingCommentId === item._id ? (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                                            <p className="text-sm text-red-800 font-medium">
                                                Are you sure you want to delete this comment? This action cannot be undone.
                                            </p>
                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={handleCommentDelete}
                                                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition"
                                                >
                                                    Yes, Delete
                                                </button>
                                                <button
                                                    onClick={() => setDeletingCommentId(null)}
                                                    className="bg-white border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-slate-50 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : editingCommentId === item._id ? (
                                        <div className="mt-3 space-y-2">
                                            <textarea
                                                value={editCommentText}
                                                onChange={(e) => setEditCommentText(e.target.value)}
                                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                rows={3}
                                            />

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleCommentUpdate(item._id)}
                                                    className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700 text-sm font-medium transition"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingCommentId(null);
                                                        setEditCommentText("");
                                                    }}
                                                    className="border px-4 py-1 rounded text-sm font-medium hover:bg-slate-100 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-slate-700 whitespace-pre-wrap">
                                            {item.comment}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
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