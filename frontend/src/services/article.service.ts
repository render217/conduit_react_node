/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "./api";

export type createArticlePayload = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};
export type updateArticlePayload = {};

export type createCommentPayload = {
    body: string;
};

class ArticleService {
    // ARTICLES
    getArticles(query: string) {
        return api.get("/articles" + query);
    }
    getArticlesFeed() {
        return api.get("/articles/feed");
    }
    getArticle(slug: string) {
        return api.get(`/articles/${slug}`);
    }
    createArticle(payload: createArticlePayload) {
        const body = { article: payload };
        return api.post("/articles", body);
    }
    updateArticle(slug: string, payload: updateArticlePayload) {
        const body = { article: payload };
        return api.put(`/articles/${slug}`, body);
    }
    deleteArticle(slug: string) {
        return api.delete(`/articles/${slug}`);
    }

    favoriteArticle(slug: string) {
        return api.post(`/articles/${slug}/favorite`);
    }
    unFavoriteArticle(slug: string) {
        return api.delete(`/articles/${slug}/favorite`);
    }

    // COMMENTS
    getComments(slug: string) {
        return api.get(`/articles/${slug}/comments`);
    }
    createComment(slug: string, payload: createCommentPayload) {
        const body = { comment: payload };
        return api.post(`/articles/${slug}/comments`, body);
    }
    deleteComment(slug: string, commentId: string) {
        return api.delete(`/articles/${slug}/comments/${commentId}`);
    }

    // TAGS
    getTags() {
        return api.get("/tags");
    }
}

export default new ArticleService();
