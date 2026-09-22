"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import AdminSidebar from "@/app/(public)/components/AdminSidebar";
import LoginCard from "@/app/(public)/components/Logincard";
import { authClient } from "@/lib/auth-client";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = authClient.useSession();


    if (!session || session?.user?.role !== "admin") {
        return (
            <div className="w-[90%] mx-auto bg-white p-6 rounded-xl shadow">
                <LoginCard />
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden bg-slate-50">

            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Right side - ONLY this area scrolls */}
            <div className="md:ml-72 h-screen overflow-y-auto">

                {/* Mobile Header */}
                <div className="md:hidden p-4 border-b bg-white">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center gap-2 text-blue-600 font-semibold"
                    >
                        <span>Admin Panel</span>
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
