import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
const getCurrentUser = (req: Request, res: Response) => {
    res.send(req.user);
};

export default getCurrentUser;
