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
} from "react-icons/fa";

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard/user",
            icon: <FaHome />,
        },
        {
            name: "Purchase History",
            path: "/dashboard/user/purchase-history",
            icon: <FaShoppingBag />,
        },
        {
            name: "Bought Artworks",
            path: "/dashboard/user/bought-artworks",
            icon: <FaImages />,
        },
        {
            name: "Subscription",
            path: "/dashboard/user/subscription",
            icon: <FaCrown />,
        },
        {
            name: "Profile",
            path: "/dashboard/user/profile",
            icon: <FaUserEdit />,
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
                        User Panel
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

                <div className="mx-4 mt-8 p-4 rounded-xl bg-blue-50 border">
                    <h3 className="font-semibold text-blue-700 mb-3">
                        Subscription Plans
                    </h3>

                    <div className="space-y-3 text-sm">

                        <div className="border-b pb-2">
                            <p className="font-semibold">Free</p>
                            <p className="text-slate-500">
                                3 Purchases
                            </p>
                            <p className="text-blue-700 font-bold">
                                $0
                            </p>
                        </div>

                        <div className="border-b pb-2">
                            <p className="font-semibold">Pro</p>
                            <p className="text-slate-500">
                                9 Purchases
                            </p>
                            <p className="text-blue-700 font-bold">
                                $9.99
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">Premium</p>
                            <p className="text-slate-500">
                                Unlimited Purchases
                            </p>
                            <p className="text-blue-700 font-bold">
                                $19.99
                            </p>
                        </div>

                    </div>
                </div>
            </aside>
        </>
    );
};

export default UserSidebar;