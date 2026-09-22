"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Sidebar from "@/app/(public)/components/Sidebar";
import LoginCard from "@/app/(public)/components/Logincard";
import { authClient } from "@/lib/auth-client";

export default function ArtistLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const { data: session } = authClient.useSession();

    if (!session || session?.user?.role !== "artist") {
        return (
            <div className="w-[90%] mx-auto bg-white p-6 rounded-xl shadow">
                <LoginCard />
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden bg-slate-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />


            <div className="md:ml-72 h-screen overflow-y-auto">


                <div className="md:hidden p-4 border-b bg-white">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center gap-2 text-teal-600 font-semibold"
                    >
                        <span>Artist Panel</span>
                        <FaChevronRight />
                    </button>
                </div>

                <main className="p-6 overflow-x-hidden">
                    {children}
                </main>

            </div>

        </div>
    );


}
