export type IArticle = {
    id: string;
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    favortiedBy?: {
        id: string;
        username: string;
        email: string;
        image: string;
    }[];
    author: {
        id: string;
        username: string;
        email: string;
        image: string;
        following: boolean;
    };
    tagList: string[];
    favoritesCount: number;
    favorited: boolean;
};

export type IComment = {
    id: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    authorId: 1;
    articleId: 11;
    author: {
        id: 1;
        username: string;
        email: string;
        image: string;
    };
};

export type ITag = {
    name: string;
    count: number;
};

export type IProfile = {
    id: number;
    username: string;
    bio: string;
    image: string;
    following: boolean;
};

export type ITab = {
    label: string;
    val: string;
    type: string;
};
