import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { prismicRichTextDefaults } from "../../../components/_shared/prismicRichTextDefaults";
import clsx from "clsx";
import React, { JSX } from "react";
import {
  marginBottom,
  marginTop,
  paddingBottom,
  paddingTop,
} from "@/core/data/SpaceData";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "Text" Slices.
 */
const Text = ({ slice }: TextProps): JSX.Element => {
  const sectionClasses = clsx(
      `w-full container flex-cc`,
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
        <div className="flex md:w-full flex-col max-w-4xl ">
          <PrismicRichText
              components={{
                ...prismicRichTextDefaults,
              }}
              field={slice.primary.paragraph}
          />
        </div>
      </section>
  );
};

export default Text;
