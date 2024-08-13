import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const deleteCommentFromArticle = async (req: Request, res: Response) => {
    const { slug, id: commentId } = req.params;
    const targetArticle = await prisma.article.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: "insensitive",
            },
        },
    });

    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }

    const targetComment = await prisma.comment.findFirst({
        where: {
            id: {
                equals: parseInt(commentId),
            },
        },
        include: {
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });

    if (!targetComment) {
        return res.status(404).send({
            message: "comment not found",
        });
    }

    const isCommentAuthor = targetComment.authorId === req.user?.id;

    if (!isCommentAuthor) {
        return res.status(403).send({
            message: "you are not the author of this comment",
        });
    }

    await prisma.comment.delete({
        where: {
            id: targetComment.id,
        },
    });

    res.json({ comment: targetComment, message: "comment deleted" });
};
export default deleteCommentFromArticle;
