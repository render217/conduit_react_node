import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ITab } from "../types";
import { TAB_TYPE_ENUM } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getActiveTabQuery = (activeTab: ITab) => {
    switch (activeTab.type) {
        case TAB_TYPE_ENUM.users_article.type:
            return `?author=${activeTab.val}`;
        case TAB_TYPE_ENUM.users_favorite_article.type:
            return `?favoritedBy=${activeTab.val}`;
        case TAB_TYPE_ENUM.tag_type.type:
            return `?tag=${activeTab.val}`;
        default: // global_feed
            return ``;
    }
};
export const getActiveTabQueryWithPagination = (
    activeTab: ITab,
    page: number
) => {
    switch (activeTab.type) {
        case TAB_TYPE_ENUM.users_article.type:
            return `?author=${activeTab.val}&page=${page}`;
        case TAB_TYPE_ENUM.users_favorite_article.type:
            return `?favoritedBy=${activeTab.val}&page=${page}`;
        case TAB_TYPE_ENUM.tag_type.type:
            return `?tag=${activeTab.val}&page=${page}`;
        default: // global_feed
            return `?page=${page}`;
    }
};

export const truncateText = (text: string, maxLength = 100) => {
    if (!text) return ""; // Return empty if description is falsy
    return text.length > maxLength
        ? `${text.substring(0, maxLength)}...`
        : text;
};

export function validateAndRenderImage(
    profileImageUrl: string,
    defaultImageUrl: string
): Promise<string> {
    const img = new Image();
    img.src = profileImageUrl;

    // Return a Promise that resolves when the image is loaded or rejects if there's an error
    return new Promise<string>((resolve) => {
        img.onload = () => resolve(profileImageUrl);
        img.onerror = () => resolve(defaultImageUrl);
    });
}
