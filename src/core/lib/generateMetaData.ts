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
  const {
    title,
    description,
    keywords,
    authors,
    url,
    ogImage,
    altImage = "",
  } = metaTags;

  return {
    title: `${title} — Abaco Derma`,
    description,
    icons: {
      icon: `/assets/icons/favicon.ico`,
    },
    openGraph: {
      title: `${title} — Abaco Derma`,
      description,
      url,
      type: "website",
      images: [
        {
          url: ogImage,
          alt: altImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Abaco Derma`,
      description,
      images: [ogImage],
      site: title,
    },
    other: {
      keywords,
      authors,
      robots: "index, follow",
    },
  };
};
