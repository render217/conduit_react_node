import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import articleService, {
    createArticlePayload,
    createCommentPayload,
    updateArticlePayload,
} from "../article.service";

/**
 * ARTICLES
 */
export const useGetArticles = (query: string) => {
    // console.log({ query });
    return useQuery({
        queryKey: ["articles", query],
        queryFn: async () => await articleService.getArticles(query),
    });
};

export const useGetArticle = (slug: string) => {
    return useQuery({
        queryKey: ["articles", slug],
        queryFn: async () => await articleService.getArticle(slug),
        enabled: !!slug,
    });
};

export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: createArticlePayload) =>
            await articleService.createArticle(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};

export const useUpdateArticle = (slug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: updateArticlePayload) =>
            await articleService.updateArticle(slug, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["articles", slug] });
        },
    });
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (articleSlug: string) =>
            await articleService.deleteArticle(articleSlug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
};

export const useFavoriteArticle = () => {
    return useMutation({
        mutationFn: async (articleSlug: string) =>
            await articleService.favoriteArticle(articleSlug),
    });
};

export const useUnFavoriteArticle = () => {
    return useMutation({
        mutationFn: async (articleSlug: string) =>
            await articleService.unFavoriteArticle(articleSlug),
    });
};
/**
 * COMMENTS
 */

export const useGetComments = (slug: string) => {
    return useQuery({
        queryKey: ["comments", slug],
        queryFn: async () => await articleService.getComments(slug),
        enabled: !!slug,
    });
};

export const useDeleteComment = (slug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (commentId: string) =>
            await articleService.deleteComment(slug, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", slug] });
        },
    });
};

export const useCreateComment = (slug: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: createCommentPayload) => {
            return await articleService.createComment(slug, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });
};

/**
 * TAGS
 */

export const useGetTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: async () => await articleService.getTags(),
    });
};
