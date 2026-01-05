// src/slices/MenuItem/index.tsx
import { Content, isFilled, type LinkField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

type PrimaryWithLink = {
    label?: string | null;
    link?: LinkField | null;
};

export default function MenuItem({ slice }: MenuItemProps) {
    const primary = slice.primary as unknown as PrimaryWithLink;

    const label = primary.label ?? "Untitled";
    const link = primary.link ?? null;

    return (
        <li className="list-none">
            {isFilled.link(link) ? (
                <PrismicNextLink
                    field={link}
                    className="block cursor-pointer text-xl font-semibold font-serif text-[#53454A] outline-none hover:text-[#7f3f3e] focus-visible:ring-2 focus-visible:ring-rose-300 rounded-sm"
                >
                    {label}
                </PrismicNextLink>
            ) : (
                <span className="block text-xl font-semibold font-serif text-gray-400">
          {label}
        </span>
            )}
        </li>
    );
}
