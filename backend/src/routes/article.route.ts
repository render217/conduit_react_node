import { Router } from "express";

import * as articlesCtrl from "../controllers/articles";
import checkAuth from "../middleware/checkAuth";
import checkAuthOptional from "../middleware/checkAuthOptional";
const articleRoutes = Router();

articleRoutes.get("/articles/feed", articlesCtrl.getArticlesFeed);

articleRoutes.get("/articles", checkAuthOptional, articlesCtrl.getArticles);

articleRoutes.get(
    "/articles/:slug",
    checkAuthOptional,
    articlesCtrl.getArticle
);

articleRoutes.post("/articles", checkAuth, articlesCtrl.createArticle);

articleRoutes.put("/articles/:slug", checkAuth, articlesCtrl.updateArticle);

articleRoutes.delete("/articles/:slug", checkAuth, articlesCtrl.deleteArticle);

articleRoutes.post(
    "/articles/:slug/comments",
    checkAuth,
    articlesCtrl.addCommentToArticle
);
articleRoutes.delete(
    "/articles/:slug/comments/:id",
    checkAuth,
    articlesCtrl.deleteCommentFromArticle
);
articleRoutes.get(
    "/articles/:slug/comments",

    articlesCtrl.getComments
);

articleRoutes.post(
    "/articles/:slug/favorite",
    checkAuth,
    articlesCtrl.favoriteArticle
);
articleRoutes.delete(
    "/articles/:slug/favorite",
    checkAuth,
    articlesCtrl.unFavoriteArticle
);

export default articleRoutes;
