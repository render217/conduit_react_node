import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const deleteArticle = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const user = req.user;
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

    const isAuthor = targetArticle.authorId === req.user?.id;
    console.log({ isAuthor, targetArticle, user });
    if (!isAuthor) {
        return res.status(403).send({
            message:
                "your are not the author of this article.(aka u're not author)",
        });
    }

    const deletedArticleAndCommentsAndTags = await prisma.$transaction(
        async (prisma) => {
            // Delete comments linked to the article
            const deletedComments = await prisma.comment.deleteMany({
                where: {
                    articleId: targetArticle.id,
                },
            });

            // Delete the article
            const deletedArticle = await prisma.article.delete({
                where: {
                    id: targetArticle.id,
                },
            });

            // Check for orphaned tags and delete them
            const deletedTags = await prisma.tag.deleteMany({
                where: {
                    articles: {
                        none: {}, // Delete tags not associated with any articles
                    },
                },
            });

            return { deletedArticle, deletedComments, deletedTags };
        }
    );

    console.log({ deletedArticleAndCommentsAndTags });

    res.json({ article: targetArticle, message: "article deleted" });
};
export default deleteArticle;
