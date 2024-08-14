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
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug } = req.params;
    const user = req.user;
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
    const isAuthor = targetArticle.authorId === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    console.log({ isAuthor, targetArticle, user });
    if (!isAuthor) {
        return res.status(403).send({
            message: "your are not the author of this article.(aka u're not author)",
        });
    }
    const deletedArticleAndCommentsAndTags = yield db_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Delete comments linked to the article
        const deletedComments = yield prisma.comment.deleteMany({
            where: {
                articleId: targetArticle.id,
            },
        });
        // Delete the article
        const deletedArticle = yield prisma.article.delete({
            where: {
                id: targetArticle.id,
            },
        });
        // Check for orphaned tags and delete them
        const deletedTags = yield prisma.tag.deleteMany({
            where: {
                articles: {
                    none: {}, // Delete tags not associated with any articles
                },
            },
        });
        return { deletedArticle, deletedComments, deletedTags };
    }));
    console.log({ deletedArticleAndCommentsAndTags });
    res.json({ article: targetArticle, message: "article deleted" });
});
exports.default = deleteArticle;
