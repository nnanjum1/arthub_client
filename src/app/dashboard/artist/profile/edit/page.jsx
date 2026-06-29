"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoginCard from "@/app/components/Logincard";

const EditProfile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
            setPreview(user.image || "");
        }
    }, [user]);

    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.url;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));

        try {
            setLoading(true);

            const imageUrl = await uploadToImgBB(file);

            setImage(imageUrl);

            toast.success("Image uploaded successfully");
        } catch (err) {
            console.log(err);
            toast.error("Image upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!name.trim()) {
            return toast.error("Name is required");
        }

        try {
            setLoading(true);
            const { data: tokenData } = await authClient.token()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name,
                        image,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message);
            }

            toast.success("Profile updated successfully");


            router.push("/dashboard/artist/profile");
            setTimeout(() => {
                window.location.reload();
            }, 1000);



        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!session || session?.user?.role !== 'artist') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }

    return (
        <div className="w-[90%] md:w-[70%] lg:w-[35%] mx-auto py-10">

            <div className="bg-white rounded-2xl shadow-lg border p-8">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Edit Profile
                </h1>

                <div className="flex flex-col items-center">

                    <img
                        src={preview || "/assets/avatar.png"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-teal-500 shadow"
                    />

                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <label
                        htmlFor="profileImage"
                        className="mt-4 cursor-pointer bg-gray-100 hover:bg-gray-200 border px-5 py-2 rounded-lg text-sm transition"
                    >
                        Change Profile Picture
                    </label>

                </div>

                <div className="mt-6">

                    <label className="block mb-2 font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                </div>

                <div className="mt-5">

                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="text"
                        value={user.email}
                        disabled
                        className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />

                </div>

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full mt-8 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 rounded-lg transition"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

            </div>

        </div>
    );
};

export default EditProfile;