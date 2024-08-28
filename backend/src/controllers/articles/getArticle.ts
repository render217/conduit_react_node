import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const getArticle = async (req: Request, res: Response) => {
    const { slug } = req.params;
    // const user = req.user;
    const decodedSlug = decodeURIComponent(slug);
    console.log({ slug, decodedSlug });
    const article = await prisma.article.findFirst({
        where: {
            slug: {
                equals: decodedSlug,
                mode: "insensitive",
            },
        },
        include: {
            tags: true,

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
        },
    });
    if (!article) {
        return res.status(404).send({
            message: "article not found",
        });
    }

    console.log({
        following: article.author.followers.map((x) => x.id),
        userId: req.user?.id,
    });
    const mappedArticle = {
        ...article,
        author: {
            ...article.author,
            following: article.author.followers.find(
                (x) => x.id.toString() === req.user?.id.toString()
            )
                ? true
                : false,

            // followers: undefined,
        },
        favorited: article.favoritedBy.some((x) => x.id === req?.user?.id),
        favoritesCount: article.favoritedBy.length,
        tagList: article.tags.map((tag) => tag.content),
        tags: undefined,
    };
    console.log(article.favoritedBy, req.user?.id);
    res.json({ article: mappedArticle });
};
export default getArticle;
//  following: userProfile.followers.some((x) => x.id === req.user?.id),
