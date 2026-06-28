"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

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
        <div className="w-[98%] lg:w-2/3 mx-auto py-10">


            <div className="bg-white shadow-lg rounded-2xl p-8 border max-w-md mx-auto">


                <div className="flex flex-col items-center">

                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-28 h-28 rounded-full object-cover border-4 border-teal-500 shadow"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-100 border-4 border-teal-500 flex items-center justify-center shadow">
                            <FaUser className="text-5xl text-gray-400" />
                        </div>
                    )}

                    <h1 className="mt-4 text-2xl font-bold text-gray-800">
                        {user.name}
                    </h1>



                </div>

                <div className="mt-8 space-y-4">

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">
                            Name:
                        </span>

                        <span>{user.name}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">
                            Email:
                        </span>

                        <span>{user.email}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">
                            Role:
                        </span>

                        <span className="capitalize">
                            {user.role || "User"}
                        </span>
                    </div>

                </div>


                <button
                    onClick={() => router.push("/dashboard/user/profile/edit")}
                    className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition"
                >
                    Edit Profile
                </button>

            </div>

        </div>

    );
};

export default MyProfile;