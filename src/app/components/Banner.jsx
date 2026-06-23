"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        image: "/assets/hero.jpeg",
        title: "Discover & Buy Original Art",
        desc: "Explore unique digital and traditional artworks from talented artists.",
    },
    {
        image: "/assets/heroo2.jpg",
        title: "Own Unique Masterpieces",
        desc: "Collect exclusive artworks and support global artists.",
    },
    {
        image: "/assets/hero3.avif",
        title: "Showcase Your Creativity",
        desc: "Upload your art and reach thousands of buyers worldwide.",
    },
];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-[90%] mx-auto h-[80vh] mb-5 ">

            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                >

                    <div className="relative w-full h-full">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority
                            className="object-fill object-center"
                        />
                    </div>

                    <div className="absolute inset-0 bg-black/60" />

                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div className="max-w-3xl text-white">
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                {slide.title}
                            </h1>

                            <p className="mt-4 text-lg md:text-xl text-gray-200">
                                {slide.desc}
                            </p>

                            <Link
                                href="/browse"
                                className="inline-block mt-6 px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-md transition font-medium"
                            >
                                Browse Artworks
                            </Link>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}