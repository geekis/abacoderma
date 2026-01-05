import { generateMetaTags } from "@/core/lib/generateMetaData";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebPage, WithContext } from "schema-dts";

type Params = {
	params: Promise<{
		slug?: string[];
	}>;
};

function uidFromSlug(slug?: string[]) {
	if (!slug || slug.length === 0) return "home";
	// Keep your underscore strategy to match generateStaticParams()
	return slug.join("_");
}

function pathFromSlug(slug?: string[]) {
	if (!slug || slug.length === 0) return "";
	return slug.join("/");
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;

	const uid = uidFromSlug(slug);
	const client = createClient();

	const page = await client.getByUID("page", uid).catch((err) => {
		console.error("Error fetching metadata:", err);
		return null;
	});

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
	const path = pathFromSlug(slug);

	// IMPORTANT: Never crash metadata generation during build
	return generateMetaTags({
		title: page?.data?.meta_title ?? "Abaco Derma",
		description: page?.data?.meta_description ?? "Default Description",
		keywords: "",
		authors: "Abaco Derma",
		url: baseUrl ? `${baseUrl}/${path}` : `/${path}`,
		ogImage: page?.data?.meta_image?.url ?? "",
		altImage: page?.data?.meta_image?.alt ?? "",
	});
}

export default async function Page({ params }: Params) {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;

	const uid = uidFromSlug(slug);
	const client = createClient();

	const page = await client.getByUID("page", uid).catch((err) => {
		console.error("Error fetching page:", err);
		return null;
	});

	if (!page) return notFound();

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
	const path = pathFromSlug(slug);

	const jsonLd: WithContext<WebPage> = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": uid,
		about: page.data.meta_title ?? undefined,
		abstract: page.data.meta_description ?? undefined,
		accessMode: ["textual", "visual"],
		alternativeHeadline: page.data.meta_title ?? undefined,
		author: "Abaco Derma",
		creator: "Abaco Derma",
		datePublished: page.first_publication_date ?? undefined,
		dateModified: page.last_publication_date ?? undefined,
		dateCreated: page.first_publication_date ?? undefined,
		image: page.data.meta_image?.url ?? undefined,
		inLanguage: "Icelandic",
		isAccessibleForFree: true,
		publisher: "Abaco Derma",
		thumbnailUrl: page.data.meta_image?.url ?? undefined,
		text: page.data.meta_description ?? undefined,
		url: baseUrl ? `${baseUrl}/${path}` : `/${path}`,
		description: page.data.meta_description ?? undefined,
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<SliceZone slices={page.data.slices} components={components} />
		</>
	);
}

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("page");

	return pages
		.filter((p) => !!p.uid)
		.map((page) => ({
			// keep consistent with uidFromSlug()
			slug: page.uid === "home" ? [] : page.uid.split("_"),
		}));
}
