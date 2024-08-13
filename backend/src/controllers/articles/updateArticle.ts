import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const updateArticle = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const {
        article: { title, description, body, tagList },
    } = req.body;

    const targetArticle = await prisma.article.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: "insensitive",
            },
        },
        include: {
            tags: true,
            author: true,
        },
    });

    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }

    const isAuthor = targetArticle.authorId === req.user?.id;
    if (!isAuthor) {
        return res.status(403).send({
            message: "you are not the author of this article",
        });
    }

    const updatedSlug = title
        ? title.toLowerCase().replace(/ /g, "-")
        : targetArticle.slug;

    const updatedTagList =
        tagList?.length > 0
            ? tagList
            : targetArticle.tags.map((tag) => tag.content);

    const updatedArticle = await prisma.article.update({
        where: {
            id: targetArticle.id,
        },
        data: {
            title: title ?? targetArticle.title,
            slug: updatedSlug,
            description: description ?? targetArticle.description,
            body: body ?? targetArticle.body,
            tags: {
                deleteMany: {},
                create: updatedTagList?.map((tag: string) => ({
                    content: tag,
                })),
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
        favorited: updatedArticle.favoritedBy.some(
            (x) => x.id === req.user?.id
        ),
        favoritesCount: updatedArticle.favoritedBy.length,
        tagList: updatedArticle.tags.map((tag) => tag.content),
        tags: undefined,
        authorId: undefined,
    };
    res.send({ article: mappedArticle });
};
export default updateArticle;
