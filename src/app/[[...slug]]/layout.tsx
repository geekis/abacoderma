// app/[[...slug]]/layout.tsx  (or app/layout.tsx if you moved it up)
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

	// Header is currently stored in `data.slices` (per your JSON)
	const headerSlices = Array.isArray(data.slices) ? data.slices : [];

	// Footer slice zone doesn't exist yet; when you add it with ID "footer", this will pick it up
	const footerSlices = Array.isArray(data.footer) ? data.footer : [];

	return (
		<>
			<PrismicPreview repositoryName={repositoryName}/>

			<header className="flex mt-6">
				<nav
					className="flex flex-grow relative justify-between items-center p-4 mt-4 mb-6 rounded-2xl text-md font-medium">
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className="text-xl font-semibold tracking-tight"
						>
							<img src={"/logo.svg"} className="h-16 md:h-28 mr-8"
								 alt="logo"/>
						</Link>

						<SliceZone slices={headerSlices} components={components}/>
					</div>
					<div className="flex gap-4 items-center">
						<a className="text-gray-800 text-lg hover:text-gray-600" href="mailto:abacoderma@abacoderma.is">Hafa
							samband</a>
						<a href="#"
						   className="py-2 px-6 text-lg border text-slate-50 bg-[#53484c] border-[#53484c] rounded-3xl">Bóka</a>
					</div>
				</nav>

			</header>

			<main>{children}</main>

			<footer className="grid grid-cols-12 gap-4 rounded-2xl bg-[#53484c] mb-8 bg-cover bg-center min-h-64 mt-6">
				<div className="mt-10 col-start-2 col-span-5"><h1 className="text-gray-50 text-3xl">Abaco|Derma</h1>
					<ul className="text-gray-50 mt-4">
						<li>Hrísalundi 1a</li>
						<li>600 Akureyri</li>
						<li>Sími: 462-3200</li>
					</ul>
				</div>
				<SliceZone slices={footerSlices} components={components}/>
			</footer>
		</>
	);
}
