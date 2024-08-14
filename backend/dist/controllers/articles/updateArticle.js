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
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { slug } = req.params;
    const { article: { title, description, body, tagList }, } = req.body;
    const targetArticle = yield db_1.prisma.article.findFirst({
        where: {
            slug: {
                equals: slug,
                mode: "insensitive",
            },
        },
        include: {
            tags: true,
            author: true,
        },
    });
    if (!targetArticle) {
        return res.status(404).send({
            message: "article not found",
        });
    }
    const isAuthor = targetArticle.authorId === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!isAuthor) {
        return res.status(403).send({
            message: "you are not the author of this article",
        });
    }
    const updatedSlug = title
        ? title.toLowerCase().replace(/ /g, "-")
        : targetArticle.slug;
    const updatedTagList = (tagList === null || tagList === void 0 ? void 0 : tagList.length) > 0
        ? tagList
        : targetArticle.tags.map((tag) => tag.content);
    const updatedArticle = yield db_1.prisma.article.update({
        where: {
            id: targetArticle.id,
        },
        data: {
            title: title !== null && title !== void 0 ? title : targetArticle.title,
            slug: updatedSlug,
            description: description !== null && description !== void 0 ? description : targetArticle.description,
            body: body !== null && body !== void 0 ? body : targetArticle.body,
            tags: {
                deleteMany: {},
                create: updatedTagList === null || updatedTagList === void 0 ? void 0 : updatedTagList.map((tag) => ({
                    content: tag,
                })),
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
    const mappedArticle = Object.assign(Object.assign({}, updatedArticle), { favorited: updatedArticle.favoritedBy.some((x) => { var _a; return x.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }), favoritesCount: updatedArticle.favoritedBy.length, tagList: updatedArticle.tags.map((tag) => tag.content), tags: undefined, authorId: undefined });
    res.send({ article: mappedArticle });
});
exports.default = updateArticle;
