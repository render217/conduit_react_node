import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const unFollowUser = async (req: Request, res: Response) => {
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

    const isOwnProfile = req.user?.id === targetUser.id;

    if (isOwnProfile) {
        return res.status(400).send({
            message: "You can't follow or unfollow yourself",
        });
    }

    const setupUnFollowing = await prisma.$transaction(async (prisma) => {
        const followee = await prisma.user.update({
            where: {
                id: req.user?.id,
            },
            data: {
                following: {
                    disconnect: {
                        id: targetUser.id,
                    },
                },
            },
        });

        const tobeUnFollowed = await prisma.user.update({
            where: {
                id: targetUser.id,
            },
            data: {
                followers: {
                    disconnect: {
                        id: req.user?.id,
                    },
                },
            },
            include: {
                followers: true,
            },
        });

        return { followee, tobeUnFollowed };
    });

    const mappedTobeFollowed = {
        id: setupUnFollowing.tobeUnFollowed.id,
        username: setupUnFollowing.tobeUnFollowed.username,
        bio: setupUnFollowing.tobeUnFollowed.bio,
        image: setupUnFollowing.tobeUnFollowed.image,
        following: setupUnFollowing.tobeUnFollowed.followers.some(
            (x) => x.id.toString() === req.user?.id.toString()
        ),
    };

    res.send({
        profile: mappedTobeFollowed,
        message: "successfully unfollowed user",
    });
};
export default unFollowUser;
