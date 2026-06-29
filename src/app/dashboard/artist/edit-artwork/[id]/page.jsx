"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ArtworkSkeleton from "@/app/components/ArtworkSkeleton";
import { authClient } from "@/lib/auth-client";

const EditArtwork = () => {
    const { id } = useParams();
    const router = useRouter();
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const { data: session } = authClient.useSession();
    console.log(session)

    const user = session?.user;

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}`
                );

                const data = await res.json();
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image: data.image,
                });

                setPreview(data.image);
            } catch (error) {
                toast.error("Failed to load artwork");
            } finally {
                setLoading(false);
            }
        };

        fetchArtwork();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = formData.image;

            if (image) {
                const imageFormData = new FormData();
                imageFormData.append("image", image);

                const imgRes = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: imageFormData,
                    }
                );

                const imgData = await imgRes.json();

                imageUrl = imgData.data.url;
            }

            const updatedArtwork = {
                ...formData,
                image: imageUrl,
                price: Number(formData.price),
            };

            const { data: tokenData } = await authClient.token()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artworks/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${tokenData?.token}`

                    },
                    body: JSON.stringify(updatedArtwork),
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                toast.success("Artwork updated successfully");
                router.push(`/artwork/${id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update artwork");
        }
    };

    if (loading) {
        return (
            <div className="w-[90%] mx-auto py-10">
                <ArtworkSkeleton />
            </div>
        );
    }

    if (!session || session?.user?.role !== 'artist') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }

    return (
        <div className="w-[90%] md:w-[70%] mx-auto py-10 bg-white p-6 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-6">
                Edit Artwork
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <textarea
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                >
                    <option value="Painting">Painting</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Sketch">Sketch</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Calligraphy">Calligraphy</option>
                </select>

                <img
                    src={preview}
                    alt="Artwork Preview"
                    className="w-48 h-48 object-cover rounded-lg border"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="
        w-full text-sm text-slate-500
        file:mr-4
        file:px-5
        file:py-2.5
        file:rounded-lg
        file:bg-sky-500
        file:text-white
        file:border-0
        file:font-semibold
        "
                />

                <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg"
                >
                    Update Artwork
                </button>

            </form>

        </div>
    );
};

export default EditArtwork;