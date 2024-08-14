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
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag, author, favoritedBy, page = 1, pageSize = 10 } = req.query;
    let currentPage = parseInt(page.toLocaleString()) || 1;
    let currentPageSize = parseInt(pageSize.toLocaleString()) || 10;
    if (currentPage < 1)
        currentPage = 1;
    if (currentPageSize < 1)
        currentPageSize = 10;
    const skip = (currentPage - 1) * currentPageSize;
    // Initialize an empty query object
    const query = {};
    // Add author filtering if provided
    if (author) {
        query.author = {
            username: {
                equals: author,
                mode: "insensitive",
            },
        };
    }
    // Add tag filtering if provided
    if (tag) {
        query.tags = {
            some: {
                content: {
                    equals: tag,
                    mode: "insensitive",
                },
            },
        };
    }
    // Add favoritedBy filtering if provided
    if (favoritedBy) {
        query.favoritedBy = {
            some: {
                username: {
                    equals: favoritedBy,
                    mode: "insensitive",
                },
            },
        };
    }
    const articles = yield db_1.prisma.article.findMany({
        where: query,
        // skip: skip,
        // take: currentPageSize,
        include: {
            favoritedBy: {
                select: { id: true, username: true, image: true, email: true },
            },
            author: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    image: true,
                    followers: true,
                },
            },
            tags: { select: { content: true } },
        },
        orderBy: { createdAt: "desc" },
    });
    const mappedArticles = articles.map((article) => {
        return Object.assign(Object.assign({}, article), { author: Object.assign(Object.assign({}, article.author), { following: article.author.followers.some((x) => { var _a; return x.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }), followers: undefined }), authorId: undefined, tags: undefined, tagList: article.tags.map((tag) => tag.content), favoritesCount: article.favoritedBy.length, favorited: article.favoritedBy.some((x) => { var _a; return x.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }) });
    });
    const payload = {
        articles: mappedArticles,
        articlesCount: mappedArticles.length,
        // currentPage: currentPage,
        // pageSize: currentPageSize,
    };
    res.send(payload);
});
exports.default = getArticles;
