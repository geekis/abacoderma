import React from "react";
import { JSXMapSerializer } from "@prismicio/react";

interface ParagraphNodeWithDir {
	direction?: "rtl" | "ltr";
}
export const prismicRichTextDefaults: JSXMapSerializer = {
	heading1: ({ children }) => <h1 className="text-4xl font-bold mt-4 mb-3">{children}</h1>,
	heading2: ({ children }) => <h2 className="text-3xl font-semibold mt-4 mb-3">{children}</h2>,
	heading3: ({ children }) => <h3 className="text-2xl font-semibold mt-3 mb-2">{children}</h3>,
	heading4: ({ children }) => <h4 className="text-xl font-semibold mt-3 mb-2">{children}</h4>,
	heading5: ({ children }) => <h5 className="text-xl font-semibold mt-3 mb-2">{children}</h5>,
	heading6: ({ children }) => <h6 className="text-xl font-semibold mt-3 mb-2">{children}</h6>,
	paragraph: ({ node, children }) => {
		const dir = (node as ParagraphNodeWithDir).direction || "auto";
		return (
			<p dir={dir}
			   className="text-base font-light leading-relaxed text-theme-text-dark mt-[10px] mb-2">{children}</p>

		);
	},

	list: ({ children }) => (
		<ul className="list-disc pl-6 text-sm font-light text-theme-text-dark mb-2">{children}</ul>
	),
	listItem: ({ children }) => <li className="mb-1">{children}</li>,

	oList: ({ children }) => (
		<ol className="list-decimal pl-6 text-sm font-light text-theme-text-dark mb-2">{children}</ol>
	),
	oListItem: ({ children }) => <li className="mb-1">{children}</li>,

	hyperlink: ({ node, children }) => (
			console.log("node URL", node),
		<a
			href={node.data?.url}
			target="_blank"
			rel="noopener noreferrer"
			className="text-[#0389ae] underline hover:text-[#025f7f] transition-colors"
		>
			{children}
		</a>
	),
};
