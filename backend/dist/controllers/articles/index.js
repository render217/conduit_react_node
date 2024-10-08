"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getArticlesFeed = exports.updateArticle = exports.getArticle = exports.unFavoriteArticle = exports.favoriteArticle = exports.deleteCommentFromArticle = exports.deleteArticle = exports.addCommentToArticle = exports.createArticle = exports.getArticles = void 0;
var getArticles_1 = require("./getArticles");
Object.defineProperty(exports, "getArticles", { enumerable: true, get: function () { return __importDefault(getArticles_1).default; } });
var createArticle_1 = require("./createArticle");
Object.defineProperty(exports, "createArticle", { enumerable: true, get: function () { return __importDefault(createArticle_1).default; } });
var addCommentToArticle_1 = require("./addCommentToArticle");
Object.defineProperty(exports, "addCommentToArticle", { enumerable: true, get: function () { return __importDefault(addCommentToArticle_1).default; } });
var deleteArticle_1 = require("./deleteArticle");
Object.defineProperty(exports, "deleteArticle", { enumerable: true, get: function () { return __importDefault(deleteArticle_1).default; } });
var deleteCommentFromArticle_1 = require("./deleteCommentFromArticle");
Object.defineProperty(exports, "deleteCommentFromArticle", { enumerable: true, get: function () { return __importDefault(deleteCommentFromArticle_1).default; } });
var favoriteArticle_1 = require("./favoriteArticle");
Object.defineProperty(exports, "favoriteArticle", { enumerable: true, get: function () { return __importDefault(favoriteArticle_1).default; } });
var unFavoriteArticle_1 = require("./unFavoriteArticle");
Object.defineProperty(exports, "unFavoriteArticle", { enumerable: true, get: function () { return __importDefault(unFavoriteArticle_1).default; } });
var getArticle_1 = require("./getArticle");
Object.defineProperty(exports, "getArticle", { enumerable: true, get: function () { return __importDefault(getArticle_1).default; } });
var updateArticle_1 = require("./updateArticle");
Object.defineProperty(exports, "updateArticle", { enumerable: true, get: function () { return __importDefault(updateArticle_1).default; } });
var getArticlesFeed_1 = require("./getArticlesFeed");
Object.defineProperty(exports, "getArticlesFeed", { enumerable: true, get: function () { return __importDefault(getArticlesFeed_1).default; } });
var getComments_1 = require("./getComments");
Object.defineProperty(exports, "getComments", { enumerable: true, get: function () { return __importDefault(getComments_1).default; } });
