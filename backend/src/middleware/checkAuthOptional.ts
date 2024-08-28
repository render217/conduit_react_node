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

const checkAuthOptional = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (!token) return next();

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
            return next();
        }
        req.user = user;
        next();
    } catch (error: Error | any) {
        return next();
    }
};

export default checkAuthOptional;
