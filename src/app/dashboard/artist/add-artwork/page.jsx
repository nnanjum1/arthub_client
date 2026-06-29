"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

const AddArtwork = () => {
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState(null);
    const { data: session } = authClient.useSession();
    console.log(session)

    const user = session?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");
        const category = formData.get("category");

        if (!image) {
            toast.error("Please select an image");
            return;
        }

        try {
            const imageFormData = new FormData();
            imageFormData.append("image", image);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: imageFormData,
                }
            );

            const imageData = await res.json();

            if (!imageData.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = imageData.data.url;

            const artworkData = {
                artistName: user?.name,
                artistEmail: user?.email,
                createdAt: new Date().toISOString(),

                title,
                description,
                price: Number(price),
                category,
                image: imageUrl,
                status: "Pending",
                availability: "available",
            };

            const saveArts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artworks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(artworkData),
            });

            const saveData = await saveArts.json();

            if (!saveArts.ok) {
                throw new Error(saveData.message);
            }

            toast.success("Artwork added successfully");

            e.target.reset();
            setImage(null);
            setPreview("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add artwork");
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    return (
        <div className="w-[90%] mx-auto bg-white p-6 rounded-xl shadow">

            <h1 className="text-2xl font-bold mb-6">
                Add Artwork
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block mb-2 font-medium">
                        Artwork Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows="4"
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Price ($)
                    </label>

                    <input
                        type="number"
                        name="price"
                        required
                        min="1"
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Category
                    </label>

                    <select
                        name="category"
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Select Category</option>
                        <option value="Painting">Painting</option>
                        <option value="Digital Art">Digital Art</option>
                        <option value="Photography">Photography</option>
                        <option value="Sketch">Sketch</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Calligraphy">Calligraphy</option>

                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Artwork Image
                    </label>

                    {preview && (
                        <div className="mb-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-48 h-48 object-cover rounded-lg border"
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        required
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
        file:cursor-pointer
        "
                    />
                </div>

                <button
                    type="submit"
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
                >
                    Add Artwork
                </button>

            </form>
        </div>
    );
};

export default AddArtwork;