import { Response, Request } from "express";
import { prisma } from "../../prisma/db";
import { hashSync, compareSync } from "bcrypt";

import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
    const { user } = req.body;

    if (!user) {
        return res.status(422).json({
            errors: {
                username: ["username is required"],
                email: ["email is required"],
                password: ["password is required"],
            },
        });
    }

    const errors = [];

    if (!user.username) {
        errors.push({ username: ["username is required"] });
    }
    if (!user.email) {
        errors.push({ email: ["email is required"] });
    }
    if (!user.password) {
        errors.push({ password: ["password is required"] });
    }

    if (errors.length) {
        return res.status(422).json({ errors });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Email has already been taken",
        });
    }

    const newUser = await prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: hashSync(user.password, 10),
        },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!);

    const payload = {
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio || "",
            image: newUser.image || null,
            token,
        },
    };
    res.json(payload);
};

export default registerUser;
