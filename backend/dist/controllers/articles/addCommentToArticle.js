"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../prisma/db");
const addCommentToArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug } = req.params;
    const { comment: { body }, } = req.body;
    const targetArticle = yield db_1.prisma.article.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: "insensitive",
            },
        },
    });
    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }
    const newComment = yield db_1.prisma.comment.create({
        data: {
            body,
            article: {
                connect: {
                    id: targetArticle.id,
                },
            },
            author: {
                connect: {
                    id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                },
            },
        },
        include: {
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });
    res.json({ comment: newComment });
});
exports.default = addCommentToArticle;
