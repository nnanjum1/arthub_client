
"use client";

import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
    console.log(session)
    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {

        const { data: tokenData } = await authClient.token()

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/artworks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${tokenData?.token}`
                },
            }
            );

            const data = await res.json();
            setArtworks(data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load artworks");
        } finally {
            setLoading(false);
        }
    };

    if (!session || session?.user?.role !== 'admin') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }

    const approveArtwork = async (id) => {
        const { data: tokenData } = await authClient.token()

        try {
            const res = await fetch(


                `${process.env.NEXT_PUBLIC_API_URL}/admin/artworks/approve/${id} `,
                {
                    method: "PATCH",
                    headers: {
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                },


            );

            if (!res.ok) {
                throw new Error();
            }

            toast.success("Artwork approved");

            setArtworks((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, status: "Approved" }
                        : item
                )
            );
        } catch {
            toast.error("Failed to approve artwork");
        }
    };

    const rejectArtwork = async (id) => {
        const { data: tokenData } = await authClient.token()

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/artworks/reject/${id} `,
                {
                    method: "PATCH",
                    headers: {
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                }
            );

            if (!res.ok) {
                throw new Error();
            }

            toast.success("Artwork rejected");

            setArtworks((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? { ...item, status: "Rejected" }
                        : item
                )
            );
        } catch {
            toast.error("Failed to reject artwork");
        }
    };

    const deleteArtwork = async (id) => {
        if (!confirm("Delete this artwork?")) return;
        const { data: tokenData } = await authClient.token()

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/artworks/${id} `,
                {
                    method: "DELETE",
                    headers: {
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                }
            );

            if (!res.ok) {
                throw new Error();
            }

            toast.success("Artwork deleted");

            setArtworks((prev) =>
                prev.filter((item) => item._id !== id)
            );
        } catch {
            toast.error("Failed to delete artwork");
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <ArtworkSkeleton />
            </div>
        );
    }



    return (
        <div className="w-[95%] mx-auto py-8">

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Manage Artworks
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Review, approve or reject artworks submitted by artists.
                    </p>
                </div>

                <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg font-semibold">
                    Total: {artworks.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

                {/* Mobile & Tablet */}
                <div className="lg:hidden p-4 space-y-4">

                    {artworks.length === 0 ? (

                        <div className="text-center py-10 text-slate-500">
                            No artworks found.
                        </div>

                    ) : (

                        artworks.map((item, index) => (

                            <div
                                key={item._id}
                                className="border rounded-xl p-4 shadow-sm"
                            >

                                <div className="flex gap-4">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-bold text-lg">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {item.artistName}
                                        </p>

                                        <div className="mt-3 space-y-2">

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Category
                                                </span>

                                                <span>{item.category}</span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-500">
                                                    Price
                                                </span>

                                                <span className="font-semibold text-teal-600">
                                                    ${item.price}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">

                                                <span className="text-slate-500">
                                                    Status
                                                </span>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${item.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : item.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-5">

                                    {item.status !== "Approved" && (
                                        <button
                                            onClick={() => approveArtwork(item._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                                        >
                                            Approve
                                        </button>
                                    )}

                                    {item.status !== "Rejected" && (
                                        <button
                                            onClick={() => rejectArtwork(item._id)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm"
                                        >
                                            Reject
                                        </button>
                                    )}

                                    <button
                                        onClick={() => deleteArtwork(item._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Desktop */}
                <div className="hidden lg:block overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-5 py-4 text-left">#</th>
                                <th className="px-5 py-4 text-left">Artwork</th>
                                <th className="px-5 py-4 text-left">Artist</th>
                                <th className="px-5 py-4 text-left">Category</th>
                                <th className="px-5 py-4 text-left">Price</th>
                                <th className="px-5 py-4 text-center">Status</th>
                                <th className="px-5 py-4 text-center">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {artworks.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="py-16 text-center text-slate-500"
                                    >
                                        No artworks found.
                                    </td>

                                </tr>

                            ) : (

                                artworks.map((item, index) => (

                                    <tr
                                        key={item._id}
                                        className="border-t hover:bg-slate-50 transition"
                                    >

                                        <td className="px-5 py-4">
                                            {index + 1}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={item.image}
                                                    className="w-16 h-16 rounded-xl object-cover"
                                                />

                                                <div>

                                                    <h3 className="font-semibold">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-xs text-slate-500">
                                                        {item._id.slice(-6)}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td>{item.artistName}</td>

                                        <td>{item.category}</td>

                                        <td className="font-semibold text-teal-600">
                                            ${item.price}
                                        </td>

                                        <td className="text-center">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="flex justify-center gap-2">

                                                {item.status !== "Approved" && (
                                                    <button
                                                        onClick={() => approveArtwork(item._id)}
                                                        className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                )}

                                                {item.status !== "Rejected" && (
                                                    <button
                                                        onClick={() => rejectArtwork(item._id)}
                                                        className="px-3 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm"
                                                    >
                                                        Reject
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => deleteArtwork(item._id)}
                                                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default ManageArtworks;

