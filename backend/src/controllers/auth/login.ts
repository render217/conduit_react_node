import { Response, Request } from "express";
import { prisma } from "../../prisma/db";
import { hashSync, compareSync } from "bcrypt";

import jwt from "jsonwebtoken";
const loginUser = async (req: Request, res: Response) => {
    const {
        user: { email, password },
    } = req.body;

    const errors = [];

    if (!email) {
        errors.push({ email: ["email is required"] });
    }
    if (!password) {
        errors.push({ password: ["password is required"] });
    }

    if (errors.length) {
        return res.status(422).json({ errors });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(400).json({
            message: "email or password is incorrect.(e not found)",
        });
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "email or password is incorrect.(p not correct)",
        });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    const payload = {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio || "",
            image: user.image || null,
            token,
        },
    };
    res.json(payload);
};

export default loginUser;
