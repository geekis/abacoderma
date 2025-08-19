"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useBodyClass() {
	const pathname = usePathname();

	useEffect(() => {
		if (typeof document !== "undefined") {
			const body = document.body;

			// Remove any previous dynamic classes
			body.classList.remove("homepage", "inner-page");

			// Add the new class based on the current route
			body.classList.add(pathname === "/" ? "homepage" : "inner-page");
		}
	}, [pathname]); // Re-run effect when the pathname changes
}
