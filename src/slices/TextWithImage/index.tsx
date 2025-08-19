import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import React, { JSX } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import {
  marginBottom,
  marginTop,
  paddingBottom,
  paddingTop,
} from "@/core/data/SpaceData";
import {prismicRichTextDefaults} from '@/../components/_shared/prismicRichTextDefaults';

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
    SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage = ({ slice }: TextWithImageProps): JSX.Element => {
  const sectionClasses = clsx(
      `w-full   `,
      marginBottom[slice.primary.margin_bottom],
      marginTop[slice.primary.margin_top],
      paddingTop[slice.primary.padding_top],
      paddingBottom[slice.primary.padding_bottom]
  );

  return (
      <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className={sectionClasses}
      >
        <div
            className={clsx(
                "flex justify-between items-start max-w-7xl mx-auto px-4 py-16 gap-16",
                slice.primary.image_position === "right"
                    ? " flex-col md:flex-row"
                    : "flex-col md:!flex-row-reverse"
            )}
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-[32px] md:text-[40px] font-bold mt-0 mb-6">
              {slice.primary.title}
            </h2>
            <div className=" ">
              {slice.primary.paragraph && (
                  <PrismicRichText
                      components={{
                        ...prismicRichTextDefaults,
                      }}
                      field={slice.primary.paragraph}
                  />
              )}
            </div>
            {slice.primary.cta_text && slice.primary.cta_link && (
                <PrismicNextLink
                    field={slice.primary.cta_link}
                    className="inline-block mt-10 bg-[#53484c] no-underline flex-cc gap-1 w-fit text-white px-8 py-4 rounded-full  hover:bg-[#4a4044] transition-colors"

                >
                  {slice.primary.cta_text}
                  <IoArrowForwardOutline />
                </PrismicNextLink>
            )}
          </div>
          <div className="flex-1 w-full items-stretch">
            {slice.primary.image && (
                <div className="relative rounded-lg justify-items-start items-start">
                  <PrismicNextImage
                      style={{ objectFit: "cover" }}
                      field={slice.primary.image}
                      blurDataURL={`${slice.primary.image.url}`}
                      className="rounded-lg"
                  />
                </div>
            )}
          </div>
        </div>
      </section>
  );
};

export default TextWithImage;
