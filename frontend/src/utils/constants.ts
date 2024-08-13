export const TAB_TYPE_ENUM = {
    users_article: {
        type: "users_article",
        query: `?author=`,
    },
    users_favorite_article: {
        type: "users_favorite_article",
        query: `?favoritedBy=`,
    },
    global_feed: {
        type: "global_feed",
        query: ``,
    },
    tag_type: {
        type: "tag_type",
        query: `?tag=`,
    },
};
