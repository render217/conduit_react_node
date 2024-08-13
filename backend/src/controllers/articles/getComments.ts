import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const getComments = async (req: Request, res: Response) => {
    const { slug: articleId } = req.params;

    const targetArticle = await prisma.article.findFirst({
        where: {
            slug: {
                equals: articleId,
                mode: "insensitive",
            },
        },
    });
    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }

    const comments = await prisma.comment.findMany({
        where: {
            articleId: targetArticle.id,
        },
        include: {
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });
    const payload = comments.map((comment) => {
        return {
            ...comment,
            authorId: undefined,
            articleId: undefined,
        };
    });
    console.log("comments response", payload);
    res.json({ comments: payload });
};
export default getComments;
