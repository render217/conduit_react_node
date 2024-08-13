import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const favoriteArticle = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const user = req.user;

    const targetArticle = await prisma.article.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: "insensitive",
            },
        },
        include: {
            favoritedBy: true,
            tags: true,
        },
    });

    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }

    const updatedArticle = await prisma.article.update({
        where: {
            id: targetArticle.id,
        },
        data: {
            favoritedBy: {
                connect: { id: user?.id },
            },
        },
        include: {
            tags: true,
            favoritedBy: {
                select: { id: true, username: true, image: true, email: true },
            },
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });

    const mappedArticle = {
        ...updatedArticle,

        favorited: true,
        favoritesCount: updatedArticle.favoritedBy.length,
        tagList: updatedArticle.tags.map((tag) => tag.content),
        tags: undefined,
        authorId: undefined,
    };

    res.send({ article: mappedArticle });
};
export default favoriteArticle;
