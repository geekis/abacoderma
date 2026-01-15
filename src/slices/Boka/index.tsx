import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Boka`.
 */
export type BokaProps = SliceComponentProps<Content.BokaSlice>;

/**
 * Component for "Boka" Slices.
 */
const Boka: FC<BokaProps> = ({ slice }) => {
  return (
      <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
      >
        <iframe
            src="https://noona.app/abacoderma/book?iframe=true&darkModeDisabled=true&showCancelButton=true"
            frameBorder="0"
            width="100%"
            height="1750"

        ></iframe>
      </section>
  );
};

export default Boka;
