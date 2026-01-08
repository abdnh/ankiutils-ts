import { checkNightMode } from "$lib/theme.svelte";
import type { LayoutData } from "./$types";
export const ssr = false;
export const prerender = false;

export const load: LayoutData = async () => {
    checkNightMode();
};
