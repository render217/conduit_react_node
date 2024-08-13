import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const followUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    const targetUser = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive",
            },
        },
    });

    if (!targetUser) {
        return res.status(404).send({
            message: "user not found",
        });
    }

    const isOwnProfile = req.user?.id.toString() === targetUser.id.toString();

    if (isOwnProfile) {
        return res.status(400).send({
            message: "You can't follow yourself",
        });
    }

    const setupFollowing = await prisma.$transaction(async (prisma) => {
        const followee = await prisma.user.update({
            where: {
                id: req.user?.id,
            },
            data: {
                following: {
                    connect: {
                        id: targetUser.id,
                    },
                },
            },
        });

        const tobeFollowed = await prisma.user.update({
            where: {
                id: targetUser.id,
            },
            data: {
                followers: {
                    connect: {
                        id: req.user?.id,
                    },
                },
            },
            include: {
                followers: true,
            },
        });

        return { followee, tobeFollowed };
    });

    const mappedTobeFollowed = {
        id: setupFollowing.tobeFollowed.id,
        username: setupFollowing.tobeFollowed.username,
        bio: setupFollowing.tobeFollowed.bio,
        image: setupFollowing.tobeFollowed.image,
        following: setupFollowing.tobeFollowed.followers.some(
            (x) => x.id.toString() === req.user?.id.toString()
        ),
    };

    res.send({
        profile: mappedTobeFollowed,
        message: "successfully followed user",
    });
};

export default followUser;
