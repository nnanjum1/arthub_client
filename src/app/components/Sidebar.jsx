"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaPaintBrush,
    FaPlusCircle,
    FaHistory,
    FaUser,
    FaTimes,
} from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Manage Artworks",
            path: "/dashboard/artist",
            icon: <FaPaintBrush />,
        },
        {
            name: "Add Artwork",
            path: "/dashboard/artist/add-artwork",
            icon: <FaPlusCircle />,
        },
        {
            name: "Sales History",
            path: "/dashboard/artist/sales-history",
            icon: <FaHistory />,
        },
        {
            name: "Profile",
            path: "/dashboard/artist/profile",
            icon: <FaUser />,
        },
    ];

    return (
        <>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
        fixed md:static top-0 left-0 min-h-screen
        w-72 bg-white border-r shadow-sm z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
    `}
            >
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-teal-600">
                        Artist Panel
                    </h2>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${pathname === item.path
                                ? "bg-teal-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;