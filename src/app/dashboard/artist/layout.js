"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { FaBars } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

export default function ArtistLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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