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
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug: articleId } = req.params;
    const targetArticle = yield db_1.prisma.article.findFirst({
        where: {
            slug: {
                equals: articleId,
                mode: "insensitive",
            },
        },
    });
    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }
    const comments = yield db_1.prisma.comment.findMany({
        where: {
            articleId: targetArticle.id,
        },
        include: {
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });
    const payload = comments.map((comment) => {
        return Object.assign(Object.assign({}, comment), { authorId: undefined, articleId: undefined });
    });
    console.log("comments response", payload);
    res.json({ comments: payload });
});
exports.default = getComments;
