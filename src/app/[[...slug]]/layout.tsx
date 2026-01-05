// app/[[...slug]]/layout.tsx  (or app/layout.tsx)
import React from "react";
import { notFound } from "next/navigation";
import { PrismicPreview } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { createClient, repositoryName } from "@/prismicio";
import { components } from "@/slices";
import Link from "next/link";

export default async function PrismicLayout({ children }: { children: React.ReactNode }) {
	const client = createClient();

	const layout = await client.getSingle("layout").catch((e) => {
		console.error("Failed to fetch layout singleton:", e);
		return null;
	});

	if (!layout) return notFound();

	const data: any = layout.data ?? {};

	const headerSlices = Array.isArray(data.slices) ? data.slices : [];
	const footerSlices = Array.isArray(data.footer) ? data.footer : [];

	return (
		<>
			<PrismicPreview repositoryName={repositoryName} />

			<header className="mt-6">
				<nav className="relative flex items-center justify-between p-4 mt-4 mb-6 rounded-2xl text-md font-medium">
					{/* Left: Logo */}
					<div className="flex items-center gap-4">
						<Link href="/" className="text-xl font-semibold tracking-tight">
							<img src={"/logo.svg"} className="h-16 md:h-28 mr-8" alt="logo" />
						</Link>

						{/* Desktop menu */}
						<div className="hidden md:block">
							<ul className="flex items-center gap-6">
								<SliceZone slices={headerSlices} components={components} />
							</ul>
						</div>
					</div>

					{/* Right: actions (desktop) */}
					<div className="hidden md:flex gap-4 items-center">
						<a className="text-gray-800 text-lg hover:text-gray-600" href="mailto:abacoderma@abacoderma.is">
							Hafa samband
						</a>
						<a
							href="https://noona.is/abacoderma/book"
							className="py-2 px-6 text-lg border text-slate-50 bg-[#53484c] border-[#53484c] rounded-3xl"
						>
							Bóka
						</a>
					</div>

					{/* Mobile menu toggle (no client JS) */}
					<details className="md:hidden">
						<summary
							className="list-none inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-3 py-2 cursor-pointer"
							aria-label="Toggle menu"
						>
							<span className="text-xl leading-none">☰</span>
						</summary>

						{/* Mobile panel */}
						<div className="absolute inset-0 right-0 left-0 top-full mt-3 z-50">
							<div className="rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-2xl">
								<ul className="flex flex-col gap-2">
									<SliceZone slices={headerSlices} components={components} />
								</ul>

								<div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
									<a className="text-gray-800 text-lg hover:text-gray-600" href="mailto:abacoderma@abacoderma.is">
										Hafa samband
									</a>
									<a
										href="https://noona.is/abacoderma/book"
										className="py-2 px-6 text-lg border text-slate-50 bg-[#53484c] border-[#53484c] rounded-3xl text-center"
									>
										Bóka
									</a>
								</div>
							</div>
						</div>
					</details>
				</nav>
			</header>

			<main>{children}</main>

			<footer className="grid grid-cols-12 gap-4 rounded-2xl bg-[#53484c] mb-8 bg-cover bg-center min-h-64 mt-6">
				<div className="mt-10 col-start-2 col-span-5">
					<h1 className="text-gray-50 text-3xl">Abaco|Derma</h1>
					<ul className="text-gray-50 mt-4">
						<li>Hrísalundi 1a</li>
						<li>600 Akureyri</li>
						<li>Sími: 462-3200</li>
					</ul>
				</div>

				<SliceZone slices={footerSlices} components={components} />
			</footer>
		</>
	);
};
