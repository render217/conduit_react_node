import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/db";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            user?: {
                id: number;
                email: string;
                username: string;
                bio: string | null;
                image: string | null;
            };
        }
    }
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // check if the token is valid
    const tokenVal = token.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenVal, process.env.JWT_SECRET!);
        req.userId = (decoded as { id: string }).id;
        const userId = parseInt(req.userId);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                image: true,
            },
        });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error: Error | any) {
        return res
            .status(401)
            .json({ message: "Unauthorized", err: error.message });
    }
};

export default checkAuth;
