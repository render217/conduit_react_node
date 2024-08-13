import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const getArticlesFeed = async (req: Request, res: Response) => {
    const articles = await prisma.article.findMany({
        include: {
            favoritedBy: {
                select: { id: true, username: true, image: true, email: true },
            },
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
            tags: true,
        },
    });

    const mappedArticles = articles.map((article) => {
        return {
            ...article,
            authorId: undefined,
            tags: undefined,
            tagList: article.tags.map((tag) => tag.content),
            favoritesCount: article.favoritedBy.length,
            favorited: article.favoritedBy.some((x) => x.id === req.user?.id),
        };
    });
    res.send({
        articles: mappedArticles,
        articlesCount: mappedArticles.length,
    });
};
export default getArticlesFeed;
