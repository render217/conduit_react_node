import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const updateUser = async (req: Request, res: Response) => {
    const {
        user: { username, email, bio, image },
    } = req.body;

    if (email) {
        const checkDuplicateEmail = await prisma.user.findUnique({
            where: { email: email },
        });
        if (checkDuplicateEmail && checkDuplicateEmail.id !== req.user?.id) {
            return res.status(400).json({
                message: "Email has already been taken",
            });
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: req.user?.id },
        data: {
            username: username ?? req.user?.username,
            email: email ?? req.user?.email,
            bio: bio ?? req.user?.bio,
            image: image ?? req.user?.image,
        },
        select: {
            id: true,
            username: true,
            email: true,
            bio: true,
            image: true,
        },
    });
    res.send(updatedUser);
};

export default updateUser;
