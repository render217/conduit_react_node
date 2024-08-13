import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { connect } from "http2";
const addCommentToArticle = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const {
        comment: { body },
    } = req.body;

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

    const newComment = await prisma.comment.create({
        data: {
            body,
            article: {
                connect: {
                    id: targetArticle.id,
                },
            },
            author: {
                connect: {
                    id: req.user?.id,
                },
            },
        },
        include: {
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });

    res.json({ comment: newComment });
};
export default addCommentToArticle;
