import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const getProfile = async (req: Request, res: Response) => {
    const { username } = req.params;

    const userProfile = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive",
            },
        },
        select: {
            id: true,
            username: true,
            bio: true,
            image: true,
            followers: true,
        },
    });

    if (!userProfile) {
        return res.status(404).send({
            message: "user not found",
        });
    }
    const mappedProfile = {
        ...userProfile,
        followers: undefined,
        following: userProfile.followers.some((x) => x.id === req.user?.id),
    };
    res.send({ profile: mappedProfile });
};

export default getProfile;
