"use client"
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">

            <div className="w-[90%] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left items-center md:items-start">

                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold text-teal-500">
                        ArtHub
                    </h2>

                    <p className="text-slate-400 mt-3 text-sm max-w-xs">
                        Discover, collect, and sell original artworks from talented artists around the world.
                    </p>

                    <p className="text-slate-500 text-sm mt-4">
                        © {new Date().getFullYear()} ArtHub. All rights reserved.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-semibold mb-3">Quick Links</h3>

                    <div className="flex flex-col gap-2 text-slate-400 text-sm">
                        <Link href="/" className="hover:text-teal-500">Home</Link>
                        <Link href="/browse" className="hover:text-teal-500">Browse Artworks</Link>
                        <Link href="/about" className="hover:text-teal-500">About</Link>
                        <Link href="/contact" className="hover:text-teal-500">Contact</Link>
                        <Link href="/privacy" className="hover:text-teal-500">Privacy Policy</Link>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-semibold mb-3">Follow Us</h3>

                    <div className="flex flex-col gap-2 text-slate-400 text-sm">

                        <a href="https://facebook.com" target="_blank" className="hover:text-teal-500">
                            Facebook
                        </a>

                        <a href="https://instagram.com" target="_blank" className="hover:text-teal-500">
                            Instagram
                        </a>

                        <a href="https://twitter.com" target="_blank" className="hover:text-teal-500">
                            Twitter
                        </a>

                        <a href="https://linkedin.com" target="_blank" className="hover:text-teal-500">
                            LinkedIn
                        </a>

                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-semibold mb-3">Newsletter</h3>

                    <p className="text-slate-400 text-sm mb-3 max-w-xs">
                        Get updates about new artworks and artists.
                    </p>

                    <div className="flex w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full px-3 py-2 rounded-l-md bg-white text-black border border-slate-300 outline-none"
                        />

                        <button onClick={() => toast.success("Will be implemented later!")} className="bg-teal-600 px-4 rounded-r-md hover:bg-teal-700 transition" >
                            Join
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}