import { generateMetaTags } from "@/core/lib/generateMetaData";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebPage, WithContext } from "schema-dts";

type Params = {
	params: Promise<{
		slug: string[];
	}>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const resolvedParams = await params;
	const { slug } = resolvedParams;
	const uid = slug ? slug.join("_") : "home";
	const client = createClient();

	const page = await client.getByUID("page", uid).catch((err) => {
		console.error("Error fetching metadata:", err);
		return null;
	});

	const MetaData: Metadata = generateMetaTags({
		title: page?.data.meta_title ?? page?.data.meta_title ?? "",
		description: page?.data.meta_description ?? "Default Description",
		keywords: page?.data.meta_description ?? "",
		authors: "Aboco Derma",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug?.join("/")}`,
		ogImage: page?.data.meta_image?.url ?? "",
		altImage: page?.data.meta_image?.alt ?? "",
	});

	return MetaData;
}

export default async function Page({ params }: Params) {
	const resolvedParams = await params;
	const { slug } = resolvedParams;
	const uid = slug ? slug.join("_") : "home";

	const client = createClient();

	try {
		const page = await client.getByUID("page", uid);

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
			datePublished: page.first_publication_date,
			dateModified: page.last_publication_date,
			dateCreated: page.first_publication_date,
			image: page?.data.meta_image?.url ?? undefined,
			inLanguage: "Icelandic",
			isAccessibleForFree: true,
			publisher: "Abaco Derma",
			thumbnailUrl: page?.data.meta_image?.url ?? undefined,
			text: page.data.meta_description ?? undefined,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug ? slug.join("/") : ""}`,
			description: page.data.meta_description ?? undefined,
		};

		// console.log(page.data.slices);

		return (
			<>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<SliceZone slices={page.data.slices} components={components} />
			</>
		);
	} catch (err) {
		console.error(err);
		notFound();
	}
}

export async function generateStaticParams() {
	const client = createClient();

	const pages = await client.getAllByType("page");

	return pages.map((page) => ({
		slug: page.uid.split("_"),
	}));
}
