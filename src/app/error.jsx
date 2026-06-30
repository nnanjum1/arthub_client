"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
            <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">

                <div className="text-7xl mb-4">⚠️</div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Something went wrong
                </h1>

                <p className="text-slate-500 mt-3 leading-7">
                    An unexpected error occurred while loading this page.
                    Please try again.
                </p>

                <div className="flex justify-center gap-4 mt-8">

                    <button
                        onClick={() => reset()}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        Reload Page
                    </button>

                    <Link
                        href="/"
                        className="border border-slate-300 hover:bg-slate-100 px-6 py-3 rounded-lg transition"
                    >
                        Go Home
                    </Link>

                </div>

            </div>
        </div>
    );
}