import { Content, isFilled } from "@prismicio/client";
import {PrismicRichText} from "@prismicio/react";
import React, {JSX } from "react";
import {
    marginBottom,
    marginTop,
    paddingBottom,
    paddingTop,
} from "@/core/data/SpaceData";
import { clsx } from "clsx";
import {PrismicNextImage, PrismicNextLink} from "@prismicio/next";

export type CardGridSliceGridStaffProps = {
  slice: Content.CardGridSliceGridStaff;
};

const CardGridStaff = ({
  slice,
}: CardGridSliceGridStaffProps): JSX.Element => {
  const sectionClasses = clsx(
    `w-full container mx-auto flex-cc col`,
    marginBottom[slice.primary.margin_bottom],
    marginTop[slice.primary.margin_top],
    paddingTop[slice.primary.padding_top],
    paddingBottom[slice.primary.padding_bottom]
  );
  return (
      <section id="content" className={sectionClasses}>
        <h3 className="text-4xl font-serif font-semibold mt-2 mb-8 text-[#53484c]">
          {slice.primary.title}
        </h3>
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-full">
              {slice.primary.cards.map((item, index) => {
                  const cardClasses =
                      "flex gap-4 no-underline items-center border border-solid border-transparent p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow";

                  const cardContent = (
                      <>
                          <PrismicNextImage
                              field={item.image}
                              alt=""
                              className="h-24 w-24 object-fill rounded-full border-4 border-transparent"
                          />
                          <span className="flex flex-col">
        <span className="text-xl font-semibold text-[#53484c]">{item.title}</span>

                              {Array.isArray(item.paragraph) ? (
                                  <PrismicRichText
                                      components={{
                                          heading2: ({ children }) => (
                                              <h2 className="text-[32px] mt-0 mb-[22px]">{children}</h2>
                                          ),
                                          heading3: ({ children }) => (
                                              <h3 className="text-[26px] mt-0 mb-[22px]">{children}</h3>
                                          ),
                                          paragraph: ({ children }) => (
                                              <p className="text-theme-text-dark font-light text-base m-0 leading-relaxed">
                                                  {children}
                                              </p>
                                          ),
                                          list: ({ children }) => (
                                              <div className="list-none text-sm sm:text-base font-light text-theme-text-dark gap-[18px] flex flex-col">
                                                  {children}
                                              </div>
                                          ),
                                          listItem: ({ children }) => (
                                              <div className="text-base text-theme-text-dark m-0 font-light relative">
                                                  <div className="absolute rounded-full top-1.5 h-[10px] w-[10px] bg-theme-primary -left-[24px]" />
                                                  {children}
                                              </div>
                                          ),
                                          hyperlink: ({ node, children }) => (
                                              <a
                                                  href={node.data?.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-[#53484c] underline hover:text-[#4a4044] transition-colors"
                                              >
                                                  {children}
                                              </a>
                                          ),
                                      }}
                                      field={item.paragraph}
                                  />
                              ) : (
                                  <p className="text-theme-text-dark font-light text-base m-0 leading-relaxed">
                                      {item.paragraph}
                                  </p>
                              )}
      </span>
                      </>
                  );

                  return isFilled.link(item.link) ? (
                      <PrismicNextLink key={index} field={item.link} className={cardClasses}>
                          {cardContent}
                      </PrismicNextLink>
                  ) : (
                      <div key={index} className={cardClasses}>
                          {cardContent}
                      </div>
                  );
              })}
          </div>
        </div>
      </section>
  );
};

export default CardGridStaff;
