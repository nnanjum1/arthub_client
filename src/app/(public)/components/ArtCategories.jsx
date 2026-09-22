"use client";

import Link from "next/link";

const categories = [
    {
        name: "Painting",
        image: "/assets/categories/painting.jpg",
    },
    {
        name: "Digital Art",
        image: "/assets/categories/digitalart.jpg",
    },
    {
        name: "Photography",
        image: "/assets/categories/photography.jpg",
    },
    {
        name: "Sketch",
        image: "/assets/categories/sketch.jpg",
    },
    {
        name: "Abstract",
        image: "/assets/categories/abstract.jpg",
    },
    {
        name: "Calligraphy",
        image: "/assets/categories/calligraphy.jpg",
    },
];

export default function ArtCategories() {
    return (
        <section className="w-[90%] mx-auto">

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">
                    Browse by Category
                </h2>

                <p className="text-slate-500 mt-2">
                    Discover artworks by your favorite style.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-5 gap-6">

                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={`/browse?category=${encodeURIComponent(category.name)}`}
                        className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                        />

                        <div className="p-4">
                            <h3 className="text-center font-semibold">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}

            </div>

        </section>
    );
}