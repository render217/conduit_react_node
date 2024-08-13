import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const generateSlug = (title: string) => {
    return title
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except for spaces and hyphens
        .trim() // Trim whitespace from the beginning and end
        .replace(/ +/g, "-") // Replace spaces with hyphens
        .replace(/-+$/g, ""); // Remove trailing hyphens
};

const createArticle = async (req: Request, res: Response) => {
    const user = req?.user;
    const {
        article: { title, description, body, tagList },
    } = req.body;

    const slug = generateSlug(title);
    console.log({ ...req.body, slug });
    const newArticle = await prisma.article.create({
        data: {
            body,
            description,
            slug,
            title,
            author: {
                connect: { id: user?.id },
            },
            tags: {
                create: tagList?.map((tag: string) => ({
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
        ...newArticle,
        favorited: newArticle.favoritedBy.some((x) => x.id === user?.id),
        favoritesCount: newArticle.favoritedBy.length,
        tagList: newArticle.tags.map((tag) => tag.content),
        tags: undefined,
    };

    res.send({ article: mappedArticle });
};

export default createArticle;
