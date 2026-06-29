"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = authClient.useSession();
    console.log(session)

    if (!session || session?.user?.role !== 'admin') {
        return (
            <div className="w-[90%] mx-auto bg-white p-6 rounded-xl shadow">
                <LoginCard />
            </div>
        );
    }
    return (
        <div className="min-h-screen flex bg-slate-50">

            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 min-w-0">




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