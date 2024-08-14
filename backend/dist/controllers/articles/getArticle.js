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
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { slug } = req.params;
    const user = req.user;
    const decodedSlug = decodeURIComponent(slug);
    console.log({ slug, decodedSlug });
    const article = yield db_1.prisma.article.findFirst({
        where: {
            slug: {
                equals: decodedSlug,
                mode: "insensitive",
            },
        },
        include: {
            tags: true,
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
        },
    });
    if (!article) {
        return res.status(404).send({
            message: "article not found",
        });
    }
    console.log({
        following: article.author.followers.map((x) => x.id),
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
    });
    const mappedArticle = Object.assign(Object.assign({}, article), { author: Object.assign(Object.assign({}, article.author), { following: article.author.followers.find((x) => { var _a; return x.id.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id.toString()); })
                ? true
                : false }), favorited: article.favoritedBy.some((x) => x.id === (user === null || user === void 0 ? void 0 : user.id)), favoritesCount: article.favoritedBy.length, tagList: article.tags.map((tag) => tag.content), tags: undefined });
    console.log(article.favoritedBy, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    res.json({ article: mappedArticle });
});
exports.default = getArticle;
//  following: userProfile.followers.some((x) => x.id === req.user?.id),
