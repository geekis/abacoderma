// app/[[...slug]]/page.tsx
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { params?: { slug?: string[] } };

export default async function Page({ params }: Params) {
	const client = createClient();
	const slugParts = params?.slug ?? [];
	const isHome = slugParts.length === 0;

	// If your homepage is a singleton, prefer:
	// const doc = await client.getSingle("homepage");
	// Otherwise, use the "page" type with UID "home".
	let doc = null;

	if (isHome) {
		// Try homepage singleton first, fall back to page/home
		doc =
			(await client.getSingle("homepage").catch(() => null)) ??
			(await client.getByUID("page", "home").catch(() => null));
	} else {
		// You said your UIDs use "_" between parts
		const uid = slugParts.join("_");
		doc = await client.getByUID("page", uid).catch(() => null);
	}

	if (!doc) return notFound();

	return <SliceZone slices={doc.data.slices} components={components} />;
}

// (optional) SEO
export async function generateMetadata({ params }: Params) {
	const client = createClient();
	const slugParts = params?.slug ?? [];
	const isHome = slugParts.length === 0;

	let doc =
		isHome
			? (await client.getSingle("homepage").catch(() => null)) ??
			(await client.getByUID("page", "home").catch(() => null))
			: await client
				.getByUID("page", slugParts.join("_"))
				.catch(() => null);

	const title = doc?.data?.meta_title ?? (isHome ? "Home" : slugParts.join(" · "));
	const description = doc?.data?.meta_description ?? "Default Description";

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: doc?.data?.meta_image?.url ? [doc.data.meta_image.url] : [],
			url:
				process.env.NEXT_PUBLIC_BASE_URL +
				(isHome ? "" : `/${slugParts.join("/")}`),
		},
	};
}
