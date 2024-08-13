import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const getArticles = async (req: Request, res: Response) => {
    const { tag, author, favoritedBy, page = 1, pageSize = 10 } = req.query;

    let currentPage = parseInt(page.toLocaleString()) || 1;
    let currentPageSize = parseInt(pageSize.toLocaleString()) || 10;

    if (currentPage < 1) currentPage = 1;
    if (currentPageSize < 1) currentPageSize = 10;
    const skip = (currentPage - 1) * currentPageSize;

    // Initialize an empty query object
    const query: any = {};

    // Add author filtering if provided
    if (author) {
        query.author = {
            username: {
                equals: author as string,
                mode: "insensitive",
            },
        };
    }

    // Add tag filtering if provided
    if (tag) {
        query.tags = {
            some: {
                content: {
                    equals: tag as string,
                    mode: "insensitive",
                },
            },
        };
    }

    // Add favoritedBy filtering if provided
    if (favoritedBy) {
        query.favoritedBy = {
            some: {
                username: {
                    equals: favoritedBy as string,
                    mode: "insensitive",
                },
            },
        };
    }

    const articles = await prisma.article.findMany({
        where: query,
        // skip: skip,
        // take: currentPageSize,
        include: {
            favoritedBy: {
                select: { id: true, username: true, image: true, email: true },
            },
            author: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    image: true,
                    followers: true,
                },
            },
            tags: { select: { content: true } },
        },
        orderBy: { createdAt: "desc" },
    });
    const mappedArticles = articles.map((article) => {
        return {
            ...article,
            author: {
                ...article.author,
                following: article.author.followers.some(
                    (x) => x.id === req.user?.id
                ),
                followers: undefined,
            },
            authorId: undefined,
            tags: undefined,
            tagList: article.tags.map((tag) => tag.content),
            favoritesCount: article.favoritedBy.length,
            favorited: article.favoritedBy.some((x) => x.id === req.user?.id),
        };
    });

    const payload = {
        articles: mappedArticles,
        articlesCount: mappedArticles.length,
        // currentPage: currentPage,
        // pageSize: currentPageSize,
    };
    res.send(payload);
};

export default getArticles;
