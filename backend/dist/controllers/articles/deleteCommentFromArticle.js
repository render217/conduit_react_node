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
const deleteCommentFromArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug, id: commentId } = req.params;
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
    const targetComment = yield db_1.prisma.comment.findFirst({
        where: {
            id: {
                equals: parseInt(commentId),
            },
        },
        include: {
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });
    if (!targetComment) {
        return res.status(404).send({
            message: "comment not found",
        });
    }
    const isCommentAuthor = targetComment.authorId === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!isCommentAuthor) {
        return res.status(403).send({
            message: "you are not the author of this comment",
        });
    }
    yield db_1.prisma.comment.delete({
        where: {
            id: targetComment.id,
        },
    });
    res.json({ comment: targetComment, message: "comment deleted" });
});
exports.default = deleteCommentFromArticle;
