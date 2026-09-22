"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (<section className="w-full bg-slate-50"> <div className="grid min-h-[75vh] grid-cols-1 md:grid-cols-2">


        {/* Text Side */}
        <div className="flex items-center px-6 py-16 sm:px-10 lg:px-20">
            <div className="max-w-xl">

                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">
                    Art made with meaning
                </p>

                <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    Find art that
                    <span className="text-teal-600"> feels like you.</span>
                </h1>

                <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                    Discover original artworks from independent artists
                    and find something that makes your space, your
                    collection, or simply your day a little more special.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href="/browse"
                        className="rounded-md bg-teal-600 px-7 py-3.5 font-medium text-white transition hover:bg-teal-700"
                    >
                        Explore Artworks
                    </Link>

                </div>

                <div className="mt-10 flex flex-wrap gap-8">
                    <div>
                        <p className="font-semibold text-slate-900">
                            Original
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Unique pieces
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            Independent
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Real artists
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            Meaningful
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Stories behind art
                        </p>
                    </div>
                </div>

            </div>
        </div>

        {/* Image Side */}
        <div className="relative min-h-[420px] md:min-h-full">
            <Image
                src="/assets/art.jpg"
                alt="Featured artwork"
                fill
                priority
                className="object-cover object-center"
            />
        </div>

    </div>
    </section>
    );


}
