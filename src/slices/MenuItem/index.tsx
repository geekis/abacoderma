// src/slices/MenuItem/index.tsx
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";

export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>;

type Linkish = {
    label?: string | null;
    link?: any;
    item_label?: string | null;
    item_link?: any;
    title?: string | null;
    url?: any;
};

function pickLabel(it: Linkish) {
    return it.item_label ?? it.label ?? it.title ?? "Untitled";
}
function pickLinkField(it: Linkish) {
    return it.item_link ?? it.link ?? it.url ?? null;
}

export default async function MenuItem({ slice }: MenuItemProps) {
    const client = createClient();

    // withSubMenu: fetch linked doc and normalize items
    if (
        slice.variation === "withSubMenu" &&
        isFilled.contentRelationship(slice.primary.sub_menu)
    ) {
        const subMenuDoc = await client.getByID(slice.primary.sub_menu.id);
        const data: any = subMenuDoc?.data ?? {};
        let items: any[] = [];

        if (Array.isArray(data.items)) items = data.items;
        else if (Array.isArray(data.menu_items)) items = data.menu_items;
        else if (Array.isArray(data.links)) items = data.links;
        else if (Array.isArray(data.slices)) {
            items = data.slices
                .filter(
                    (s: any) =>
                        s.slice_type === "submenu_item" ||
                        s.slice_type === "link" ||
                        s.primary
                )
                .map((s: any) => s.primary ?? s);
        }

        const hasItems = items.length > 0;

        return (
            /**
             * Use a "group relative" wrapper so the absolutely-positioned mega-menu
             * can anchor to this element. Hover/focus on the label (peer) opens the menu.
             */
            <div className="group  text-lg">
                {/* Trigger (label) */}
                <div
                    className="inline-flex items-center gap-2"
                    aria-haspopup="menu"
                    aria-expanded="false"
                >
                    {/* Make the label focusable for keyboard users */}
                    <span
                        tabIndex={0}
                        className="peer cursor-pointer text-[#984C4B] outline-none hover:text-[#7f3f3e] focus-visible:ring-2 focus-visible:ring-rose-300 rounded-sm"
                    >
            {slice.primary.label}
          </span>
                </div>

                {/* Mega menu: hidden by default; shown on hover/focus of trigger or any part of the group */}
                <ul
                    role="menu"
                    className={[
                        // base box
                        "mega-menu absolute inset-x-0 z-50 pt-8 w-full min-w-full left-0 right-0",
                        "rounded-2xl border border-gray-300 bg-gray-100 p-8 shadow-2xl",
                        "normal-case font-normal text-sm",
                        // visibility controls
                        "hidden opacity-0 translate-y-2 pointer-events-none",
                        "group-hover:block group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                        "group-focus-within:block group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
                        "peer-hover:block peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto",
                        "peer-focus-visible:block peer-focus-visible:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:pointer-events-auto",
                        // transition
                        "transition-opacity transition-transform duration-150 ease-out"
                    ].join(" ")}
                >
                    {!hasItems ? (
                        <li className="px-3 py-2 text-gray-500">
                            No items
                            <pre className="mt-2 max-h-48 w-[28rem] overflow-auto text-gray-600">
                {JSON.stringify(Object.keys(data || {}), null, 2)}
              </pre>
                        </li>
                    ) : (
                        <div
                            className="
                grid grid-cols-1 gap-2
                sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              "
                        >
                            {items.map((it, i) => {
                                const linkField = pickLinkField(it);
                                const label = pickLabel(it);

                                return (
                                    <li key={i} role="none" className="list-none">
                                        {isFilled.link(linkField) ? (
                                            <PrismicNextLink
                                                field={linkField}
                                                role="menuitem"
                                                className="block rounded-lg px-3 py-2 text-lg text-gray-800 hover:bg-white/60 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                                            >
                                                {label}
                                            </PrismicNextLink>
                                        ) : (
                                            <span className="block rounded-lg px-3 py-2 text-gray-500">
                        {label}
                      </span>
                                        )}
                                    </li>
                                );
                            })}
                        </div>
                    )}
                </ul>
            </div>
        );
    }
    // default: single link
    return (
        <div className="text-lg">
            {isFilled.link(slice.primary.link) ? (

                <PrismicNextLink field={slice.primary.link} className="inline-block">
                    {slice.primary.link.text}
                </PrismicNextLink>
            ) : (
                <span>{slice.primary.label}</span>
            )}
        </div>
    );
}
