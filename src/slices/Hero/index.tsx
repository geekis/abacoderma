import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const bgUrl = isFilled.image(slice.primary.image)
      ? slice.primary.image.url
      : undefined;


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero grid grid-cols-12 gap-4 rounded-2xl bg-cover  bg-center  h-[550px] mb-8"
      style={{
        backgroundImage: `url(${slice.primary.image.url})`,
      }}

    >
      <div className="grid gap-4 col-start-2 col-span-5 self-center">
        <h1 className="font-serif text-slate-50 text-3xl md:text-5xl">{slice.primary.title}</h1>
        <p className="text-slate-50">{slice.primary.text}</p>

        {isFilled.link(slice.primary.url) && (
            <div className="mt-4">
              <div className="mt-4">
                <PrismicNextLink
                    field={slice.primary.url}
                    className="border border-slate-50 rounded-3xl px-6 py-3 text-slate-50 hover:bg-slate-50 hover:text-slate-700 ease-in-out duration-200"
                >
                  {slice.primary.url.text || "Read more"}
                </PrismicNextLink>
              </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
