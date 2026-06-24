import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="text-center">

                <div className="text-8xl mb-4">
                    🎨
                </div>

                <h1 className="text-5xl font-bold text-slate-800">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mt-4">
                    Page Not Found
                </h2>

                <p className="text-slate-500 mt-3">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
                >
                    Go Home
                </Link>

            </div>

        </div>
    );
}