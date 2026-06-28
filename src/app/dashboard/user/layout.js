"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import UserSidebar from "@/app/components/UserSidebar";

export default function UserLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-slate-50">

            <UserSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 min-w-0">


                <div className="md:hidden p-4 border-b bg-white">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center gap-2 text-blue-600 font-semibold"
                    >
                        <span>User Panel</span>
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