import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const getTags = async (req: Request, res: Response) => {
    const tags = await prisma.tag.groupBy({
        by: ["content"],
        _count: {
            content: true,
        },
        orderBy: {
            _count: {
                content: "desc",
            },
        },
    });

    const mappedTags = tags.map((tag) => {
        return {
            name: tag.content,
            count: tag._count.content,
        };
    });

    res.send({ tags: mappedTags.slice(0, 8) });
};

export default getTags;
