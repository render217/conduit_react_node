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
const generateSlug = (title) => {
    return title
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except for spaces and hyphens
        .trim() // Trim whitespace from the beginning and end
        .replace(/ +/g, "-") // Replace spaces with hyphens
        .replace(/-+$/g, ""); // Remove trailing hyphens
};
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const { article: { title, description, body, tagList }, } = req.body;
    const slug = generateSlug(title);
    console.log(Object.assign(Object.assign({}, req.body), { slug }));
    const newArticle = yield db_1.prisma.article.create({
        data: {
            body,
            description,
            slug,
            title,
            author: {
                connect: { id: user === null || user === void 0 ? void 0 : user.id },
            },
            tags: {
                create: tagList === null || tagList === void 0 ? void 0 : tagList.map((tag) => ({
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
    const mappedArticle = Object.assign(Object.assign({}, newArticle), { favorited: newArticle.favoritedBy.some((x) => x.id === (user === null || user === void 0 ? void 0 : user.id)), favoritesCount: newArticle.favoritedBy.length, tagList: newArticle.tags.map((tag) => tag.content), tags: undefined });
    res.send({ article: mappedArticle });
});
exports.default = createArticle;
