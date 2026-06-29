"use client";





"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaHome,
    FaShoppingBag,
    FaImages,
    FaUserEdit,
    FaCrown,
    FaTimes,
    FaMoneyCheckAlt,
    FaPalette,
    FaUsers,
    FaTachometerAlt,
} from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/dashboard/admin",
        },
        {
            name: "Manage Users",
            icon: <FaUsers />,
            path: "/dashboard/admin/manage-users",
        },
        {
            name: "Manage Artworks",
            icon: <FaPalette />,
            path: "/dashboard/admin/manage-artworks",
        },
        {
            name: "Transactions",
            icon: <FaMoneyCheckAlt />,
            path: "/dashboard/admin/transactions",
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
                    <h2 className="text-2xl font-bold text-blue-700">
                        Admin Panel
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
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
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


export default AdminSidebar;