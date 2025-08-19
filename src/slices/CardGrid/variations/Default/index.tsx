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
  return (
      <section id="content" className={sectionClasses}>
          <h2 className="mb-[40px] md:mb-[52px] text-[32px] md:text-[48px] font-semibold font-serif text-[#53484c]">
              {slice.primary.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 min-w-full">


          {slice.primary.cards.map((card, index) => (
              <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md border-solid shadow-[#53484c]/20 transition-shadow border border-transparent">
                  <div className="flex items-start felx justify-center">
                      <h2 className="block mt-1 mb-3 text-2xl font-serif font-semibold text-[#53484c] text-center">{card.title}</h2>
                  </div>
                  <div className="mb-3">
                      <PrismicRichText
                          components={{
                              ...prismicRichTextDefaults,
                          }}
                          field={card.paragraph}
                      />
                  </div>

                  <div className="flex justify-center items-end">
                      {card.link.text && (
                          <PrismicNextLink
                              field={card.link}
                              className="text-white border bg-[#53484c] hover:bg-slate-50 hover:text-[#53484c] hover:border-[#53484c] py-2 px-4 rounded"
                          >
                              {card.link.text}
                          </PrismicNextLink>
                      )}
                  </div>
              </div>
          ))}
          </div>
      </section>
  );
};

    export default CardGridDefault;
