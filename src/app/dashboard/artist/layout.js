"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import LoginCard from "@/app/components/Logincard";
import { authClient } from "@/lib/auth-client";

export default function ArtistLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data: session } = authClient.useSession();
    console.log(session)

    if (!session || session?.user?.role !== 'artist') {
        return (
            <div >
                <LoginCard />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-slate-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 min-w-0">

                <div className="md:hidden p-4 border-b bg-white">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden flex items-center gap-2 text-teal-600 font-semibold"
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