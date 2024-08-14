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
const favoriteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const user = req.user;
    const targetArticle = yield db_1.prisma.article.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: "insensitive",
            },
        },
        include: {
            favoritedBy: true,
            tags: true,
        },
    });
    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }
    const updatedArticle = yield db_1.prisma.article.update({
        where: {
            id: targetArticle.id,
        },
        data: {
            favoritedBy: {
                connect: { id: user === null || user === void 0 ? void 0 : user.id },
            },
        },
        include: {
            tags: true,
            favoritedBy: {
                select: { id: true, username: true, image: true, email: true },
            },
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
        },
    });
    const mappedArticle = Object.assign(Object.assign({}, updatedArticle), { favorited: true, favoritesCount: updatedArticle.favoritedBy.length, tagList: updatedArticle.tags.map((tag) => tag.content), tags: undefined, authorId: undefined });
    res.send({ article: mappedArticle });
});
exports.default = favoriteArticle;
