"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const article_route_1 = __importDefault(require("./article.route"));
const user_route_1 = __importDefault(require("./user.route"));
const tag_route_1 = __importDefault(require("./tag.route"));
const routes = (0, express_1.Router)();
routes.use(auth_route_1.default);
// need middleware here
routes.use(user_route_1.default);
routes.use(article_route_1.default);
routes.use(tag_route_1.default);
exports.default = routes;
