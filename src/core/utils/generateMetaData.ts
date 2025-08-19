type MetaTagProps = {
	title: string;
	description: string;
	keywords: string;
	authors: string;
	url: string;
	ogImage: string;
	altImage: string;
};

export const generateMetaTags = (metaTags: MetaTagProps) => {
	const { title, description, keywords, authors, url, ogImage, altImage = '' } = metaTags;

	return {
		title,
		description,
		icons: {
			icon: '/favicon.ico',
		},
		openGraph: {
			title,
			description,
			url,
			type: 'website',
			images: [
				{
					url: ogImage,
					alt: altImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
			site: title,
		},
		robots: {
			index: true,
			follow: true,
		},
		other: {
			keywords,
			authors,
		},
	};
};
