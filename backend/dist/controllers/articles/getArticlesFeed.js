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
const getArticlesFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield db_1.prisma.article.findMany({
        include: {
            favoritedBy: {
                select: { id: true, username: true, image: true, email: true },
            },
            author: {
                select: { id: true, username: true, email: true, image: true },
            },
            tags: true,
        },
    });
    const mappedArticles = articles.map((article) => {
        return Object.assign(Object.assign({}, article), { authorId: undefined, tags: undefined, tagList: article.tags.map((tag) => tag.content), favoritesCount: article.favoritedBy.length, favorited: article.favoritedBy.some((x) => { var _a; return x.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }) });
    });
    res.send({
        articles: mappedArticles,
        articlesCount: mappedArticles.length,
    });
});
exports.default = getArticlesFeed;
