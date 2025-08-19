import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import Default from "./variations/Default";
import CardGridStaff from "./variations/GridStaff";

/**
 * Props for `CardGrid`.
 */
export type CardGridProps = SliceComponentProps<Content.CardGridSlice>;

/**
 * Component for "CardGrid" Slices.
 */
const CardGrid = ({ slice }: CardGridProps): JSX.Element => {
  return (
      <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
      >
        {(() => {
          switch (slice.variation) {
            case "default":
              return <Default slice={slice} />;
            case "gridStaff":
              return <CardGridStaff slice={slice} />;

            default:
              return null;
          }
        })()}
      </section>
  );
};

export default CardGrid;
