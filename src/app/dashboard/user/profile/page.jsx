"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const MyProfile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <h2 className="text-xl font-semibold text-gray-600">
                    Please login to view profile
                </h2>
            </div>
        );
    }

    return (
        <div className="w-[90%] lg:w-2/3 mx-auto py-10">

            <div className="bg-white shadow-lg rounded-2xl p-8 border">

                <div className="flex items-center gap-5 mb-6">

                    <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">
                            {user.name}
                        </h1>

                        <p className="text-gray-500">
                            {user.email}
                        </p>
                    </div>

                </div>

                <div className="space-y-4 text-gray-700">

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Name</span>
                        <span>{user.name}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Email</span>
                        <span>{user.email}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Role</span>
                        <span className="capitalize">
                            {user.role || "User"}
                        </span>
                    </div>

                </div>


                <div className="mt-6 flex gap-3">

                    <button
                        onClick={() => router.push("/dashboard/profile/edit")}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Edit Profile
                    </button>

                </div>

            </div>

        </div>
    );
};

export default MyProfile;