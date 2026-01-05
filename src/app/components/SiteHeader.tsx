// app/components/SiteHeader.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { SliceZone } from "@prismicio/react";

type Props = {
    headerSlices: any[];
    components: Record<string, any>;
};

export default function SiteHeader({ headerSlices, components }: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <header className="mt-6">
            <nav className="relative flex items-center justify-between p-4 mt-4 mb-6 rounded-2xl text-md font-medium">
                {/* Left: logo */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-semibold tracking-tight">
                        <img src={"/logo.svg"} className="h-16 md:h-28 mr-8" alt="logo" />
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        {/* If your MenuItem slice returns <li>, wrap with <ul> here.
                If it returns plain <a>/<div>, you can remove the <ul>. */}
                        <ul className="flex items-center gap-6">
                            <SliceZone slices={headerSlices} components={components} />
                        </ul>
                    </div>
                </div>

                {/* Right: actions */}
                <div className="flex gap-4 items-center">
                    <a
                        className="hidden md:inline text-gray-800 text-lg hover:text-gray-600"
                        href="mailto:abacoderma@abacoderma.is"
                    >
                        Hafa samband
                    </a>

                    <a
                        href="#"
                        className="hidden md:inline py-2 px-6 text-lg border text-slate-50 bg-[#53484c] border-[#53484c] rounded-3xl"
                    >
                        Bóka
                    </a>

                    {/* Mobile burger */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-3 py-2"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
                    </button>
                </div>

                {/* Mobile panel */}
                <div className={open ? "md:hidden absolute left-0 right-0 top-full mt-3 z-50" : "hidden"}>
                    <div className="rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-2xl">
                        <ul className="flex flex-col gap-2">
                            <SliceZone slices={headerSlices} components={components} />
                        </ul>

                        <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
                            <a className="text-gray-800 text-lg hover:text-gray-600" href="mailto:abacoderma@abacoderma.is">
                                Hafa samband
                            </a>
                            <a
                                href="#"
                                className="py-2 px-6 text-lg border text-slate-50 bg-[#53484c] border-[#53484c] rounded-3xl text-center"
                            >
                                Bóka
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
