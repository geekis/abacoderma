import {
    marginBottom,
    marginTop,
    paddingBottom,
    paddingTop,
} from "@/core/data/SpaceData";
import {
    Content,
    LinkField,
    TitleField,
    KeyTextField,
    RichTextField,
} from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {PrismicRichText, PrismicText, PrismicTextProps} from "@prismicio/react";
import clsx from "clsx";
import React, { JSX } from "react";

import {prismicRichTextDefaults} from '../../../../../components/_shared/prismicRichTextDefaults';

// Utility function to sanitize the title
const sanitizeTitle = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/ð/g, "d") // Replace specific characters like ð with d
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters
};

export type CardGridSliceDefaultProps = {
    slice: Content.CardGridSliceDefault
};

const CardGridDefault = ({ slice }: CardGridSliceDefaultProps): JSX.Element => {
    const sectionClasses = clsx(
        `w-full container mx-auto flex-cc col `,
        marginBottom[slice.primary.margin_bottom],
        marginTop[slice.primary.margin_top],
        paddingTop[slice.primary.padding_top],
        paddingBottom[slice.primary.padding_bottom]
    );

    const sanitizedId = sanitizeTitle(slice.primary.title || "");

    return (
        <section id="content" className={sectionClasses}>
            <h2
                id={sanitizedId}
                className="mb-[40px] md:mb-[52px] text-[32px] md:text-[48px] font-semibold font-serif text-[#53484c]"
            >
                {slice.primary.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 min-w-full">
                {slice.primary.cards.map((card, index) => {
                    const cardContent = (
                        <>
                            <div className="flex items-start justify-center">
                                <h2 className="block mt-1 mb-3 text-2xl font-serif font-semibold text-[#53484c] text-center">
                                    {card.title}
                                </h2>
                            </div>
                            <div className="mb-3 text-center">
                                <PrismicRichText
                                    components={{
                                        ...prismicRichTextDefaults,
                                    }}
                                    field={card.paragraph}
                                />
                            </div>
                            <div className="flex justify-center items-end">
                                {card.link.text && (
                                    <span className="text-white text-center border bg-[#53484c] hover:bg-slate-50 hover:text-[#53484c] hover:border-[#53484c] py-2 px-4 rounded">
                                      {card.link.text}
                                    </span>
                                )}
                            </div>
                        </>
                    );

                    return card.link ? (
                        <PrismicNextLink
                            key={index}
                            field={card.link}
                            className="bg-white hover:bg-[#F9F6F6] transition-all duration-300 ease-in-out rounded-lg p-6 shadow-md border-solid shadow-[#53484c]/20 transition-shadow border border-transparent block"
                        >
                            {cardContent}
                        </PrismicNextLink>
                    ) : (
                        <div
                            key={index}
                            className="bg-white hover:bg-[#F9F6F6] transition-all duration-300 ease-in-out rounded-lg p-6 shadow-md border-solid shadow-[#53484c]/20 transition-shadow border border-transparent"
                        >
                            {cardContent}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CardGridDefault;
