"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();
    const { data: session } = authClient.useSession();
    console.log(session)

    const user = session?.user;
    const handleLogout = async () => {
        await authClient.signOut();

        toast.success("Logged out successfully");
        router.push("/");

    };

    const getDashboardRoute = () => {
        if (user?.role === "admin") return "/dashboard/admin";
        if (user?.role === "artist") return "/dashboard/artist";
        return "/dashboard/user";
    };

    const isActive = (path) =>
        pathname === path
            ? "text-teal-600 font-semibold"
            : "text-slate-700 hover:text-teal-600 transition";



    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="w-[90%] mx-auto h-16 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/logo.png"
                        alt="ArtHub"
                        width={80}
                        height={100}
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8">

                    <Link href="/" className={isActive("/")}>
                        Home
                    </Link>

                    <Link href="/browse" className={isActive("/browse")}>
                        Browse Artworks
                    </Link>

                    {user ? (
                        <div className="relative flex items-center gap-3">


                            <Link
                                href={getDashboardRoute()}
                                className={isActive(getDashboardRoute())}
                            >
                                Dashboard
                            </Link>




                            <button onClick={handleLogout} className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                Logout
                            </button>


                        </div>
                    ) : (
                        <div className="flex items-center gap-3">

                            <Link
                                href="/login"
                                className="px-4 py-1.5 text-teal-600 border border-teal-600 rounded-md"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="px-4 py-1.5 bg-teal-600 text-white rounded-md"
                            >
                                Register
                            </Link>

                        </div>
                    )}
                </div>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-2xl"
                >
                    {mobileOpen ? "✕" : "☰"}
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t bg-white">

                    <Link href="/" className={isActive("/")}>
                        Home
                    </Link>

                    <Link href="/browse" className={isActive("/browse")}>
                        Browse Artworks
                    </Link>

                    {user ? (
                        <>
                            <Link
                                href={
                                    user?.role === "artist"
                                        ? "/dashboard/artist"
                                        : "/dashboard/user"
                                }
                            >
                                Dashboard
                            </Link>



                            <button onClick={handleLogout} className="text-red-500 text-left">
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2 pt-2">

                            <Link
                                href="/login"
                                className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md text-center"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="px-4 py-2 bg-teal-600 text-white rounded-md text-center"
                            >
                                Register
                            </Link>

                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}