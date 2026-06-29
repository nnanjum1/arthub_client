import React from 'react';
import Link from 'next/link';

const LoginCard = () => {
    return (
        <div className="w-[90%] mx-auto  text-center bg-white min-h-screen p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
                Please Log In
            </h3>
            <p className="text-slate-500 text-center text-sm mb-5">
                You need to be logged in to view this content.
            </p>
            <Link
                href="/login"
                className=" bg-teal-600  hover:bg-teal-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors text-center"
            >
                Log In
            </Link>
        </div>
    );
};

export default LoginCard;