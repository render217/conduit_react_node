/* eslint-disable @typescript-eslint/no-unused-vars */
import { Edit, Heart, Minus, Plus, Trash2 } from "lucide-react";
import { IArticle } from "../../../types";
import CommentForm from "../../../components/forms/comment-form";
import Comments from "./comments";
import {
    useDeleteArticle,
    useFavoriteArticle,
    useGetArticle,
    useUnFavoriteArticle,
} from "../../../services/queryhooks/article.hooks";
import { Link, useNavigate, useParams } from "react-router-dom";

import FormattedDate from "../../../components/ui/formattedDate";
import { useAuth } from "../../../context/auth-context";

import ActionButton from "../../../components/ui/action-button";
import { twMerge } from "tailwind-merge";
import {
    useFollowUser,
    useUnFollowUser,
} from "../../../services/queryhooks/user.hooks";
import { handleError } from "../../../utils/errorUtils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/loaders/loading-spineer";
import PageLoader from "../../../components/ui/loaders/page-loader";
import ErrorMessage from "../../../components/ui/error-message";

export default function ArticleDetail() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useAuth();
    const params = useParams();
    const articleSlug = (params?.articleSlug as string) || "";

    const {
        data: responseData,
        isLoading,
        isError,
        refetch: refetchArticle,
    } = useGetArticle(articleSlug);

    const article = responseData?.data?.article as IArticle;

    const { mutateAsync: followUserAsync, isPending: isFollowUserending } =
        useFollowUser();

    const { mutateAsync: unFollowUserAsync, isPending: isUnFollowUserPending } =
        useUnFollowUser();

    const {
        mutateAsync: favoriteArticleAsync,
        isPending: isFavoriteArticlePending,
    } = useFavoriteArticle();

    const {
        mutateAsync: unFavoriteArticleAsync,
        isPending: isUnFavoriteArticlePending,
    } = useUnFavoriteArticle();

    const {
        mutateAsync: deleteArticleAsync,
        isPending: isDeleteArticlePending,
    } = useDeleteArticle();

    if (isLoading) return <PageLoader />;
    if (isError) return <ErrorMessage />;
    if (!article) return <p>Article not found</p>;

    const isSelf = user?.id.toString() === article?.author.id.toString();
    const isFollowed = article?.author.following;
    const isFavorited = article?.favorited;

    const handleEdit = () => {
        navigate(`/editor/${article?.slug}/edit`);
    };

    const handleDelete = async () => {
        try {
            await deleteArticleAsync(article?.slug);
            toast.success("successfully deleted article");
            navigate(-1);
        } catch (error) {
            handleError(error);
        }
    };

    const handleFollow = async () => {
        const targetFn = isFollowed ? unFollowUserAsync : followUserAsync;
        try {
            await targetFn(article.author.username);

            queryClient.invalidateQueries({
                queryKey: ["articles", article?.slug],
            });

            const toastMsg = isFollowed
                ? `successfully unfollowed`
                : `successfully followed`;
            toast.success(toastMsg);
        } catch (error) {
            handleError(error);
        }
    };
    const handleFavorite = async () => {
        const targetFn = isFavorited
            ? unFavoriteArticleAsync
            : favoriteArticleAsync;

        try {
            await targetFn(article.slug);
            queryClient.invalidateQueries({
                queryKey: ["articles", article?.slug],
            });
            const toastMsg = isFollowed
                ? `successfully favorited`
                : `successfully unfavorited`;

            toast.success(toastMsg);
        } catch (error) {
            handleError(error);
        }
    };

    const authorImage =
        article.author.image !== "" ? article.author.image : "/profile.png";
    return (
        <div>
            <ArticleDetailBanner
                article={article}
                isSelf={isSelf}
                handleFollow={handleFollow}
                handleFavorite={handleFavorite}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isFavorited={isFavorited}
                isFollowed={isFollowed}
            />
            <div className="mx-auto max-w-[1200px] px-10 h-full pt-8 space-y-5">
                <p className="text-lg">{article.body}</p>
                <div className="flex gap-2 py-4">
                    {article.tagList.map((tag, idx) => {
                        return (
                            <p
                                className="border border-gray-400 rounded-md px-2 text-xs"
                                key={idx}>
                                {tag}
                            </p>
                        );
                    })}
                </div>
                <div className="border-t border-gray-500 py-2">
                    <div className="flex items-end gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    className="object-cover "
                                    src={authorImage}
                                    alt="author"
                                />
                            </div>
                            <div className="">
                                <p className="font-sourceSans3 ">
                                    <Link
                                        to={`/profile/${article.author.username}`}>
                                        {" "}
                                        {article.author.username}
                                    </Link>
                                </p>
                                <p className="text-xs text-light text-clrOsloGrey">
                                    August 12 , 2024
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                {isSelf ? (
                                    <>
                                        <div className="flex gap-3">
                                            <ActionButton
                                                onClick={handleEdit}
                                                activeText="Edit Article"
                                                inactiveText=""
                                                isActive={true}
                                                activeClassName="border border-gray-500 hover:bg-clrGainsboro/40 hover:text-white text-clrDoveGrey"
                                                inactiveClassName=""
                                                icon={Edit}
                                            />
                                            <ActionButton
                                                onClick={handleDelete}
                                                activeText="Delete Article"
                                                inactiveText=""
                                                isActive={true}
                                                activeClassName="border border-clrIndianRed text-clrIndianRed hover:bg-clrIndianRed hover:text-clrHarp"
                                                inactiveClassName={twMerge("")}
                                                icon={Trash2}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex gap-3">
                                            <ActionButton
                                                onClick={handleFollow}
                                                isActive={isFollowed}
                                                icon={isFollowed ? Minus : Plus}
                                                activeText={`UnFollow ${article.author.username}`}
                                                inactiveText={`Follow ${article.author.username}`}
                                                inactiveClassName="border border-gray-500 hover:bg-clrGainsboro/40 hover:text-clrDoveGrey text-clrDoveGrey"
                                                activeClassName="border border-gray-500 hover:bg-clrGainsboro/40 hover:text-clrDoveGrey text-clrDoveGrey"
                                            />
                                            <ActionButton
                                                onClick={handleFavorite}
                                                isActive={isFavorited}
                                                icon={
                                                    isFavorited ? Heart : Heart
                                                }
                                                activeText={`UnFavorite Article (${article.favoritesCount})`}
                                                inactiveText={`Favorite Article (${article.favoritesCount})`}
                                                inactiveClassName="border border-clrTurtleGreen  text-clrTurtleGreen hover:bg-clrTurtleGreen hover:text-clrHarp"
                                                activeClassName="border border-gray-500 hover:bg-clrTurtleGreen hover:text-clrHarp bg-clrTurtleGreen text-white"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-10 max-w-[700px]">
                    <CommentForm articleSlug={articleSlug} />
                    <Comments articleSlug={articleSlug} />
                </div>
            </div>
        </div>
    );
}

function ArticleDetailBanner({
    article,
    isSelf,
    isFollowed,
    isFavorited,
    handleFavorite,
    handleFollow,
    handleEdit,
    handleDelete,
}: {
    article: IArticle;
    isSelf: boolean;
    isFollowed: boolean;
    isFavorited: boolean;
    handleFollow: () => void;
    handleFavorite: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
}) {
    const authorImage =
        article.author.image !== "" ? article.author.image : "/profile.png";

    return (
        <div className="min-h-[200px]  shadow-md bg-[#333333]">
            <div className=" max-w-[1200px] mx-auto w-full px-10 h-full py-8">
                <div className="space-y-9">
                    <h1 className="text-5xl leading-tight text-clrGainsboro font-semibold font-titilliumWeb">
                        {article.title}
                    </h1>
                    <div className="flex items-end gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    className="object-cover "
                                    src={authorImage}
                                    alt="author"
                                />
                            </div>
                            <div className="">
                                <p className="font-sourceSans3 text-clrHarp font-semibold">
                                    <Link
                                        to={`/profile/${article.author.username}`}>
                                        {" "}
                                        {article.author.username}
                                    </Link>
                                </p>
                                <p className="text-xs text-light text-clrOsloGrey">
                                    <FormattedDate
                                        timestamp={article.updatedAt}
                                    />
                                </p>
                            </div>
                        </div>
                        <ActionButtons
                            article={article}
                            isSelf={isSelf}
                            isFavorited={isFavorited}
                            isFollowed={isFollowed}
                            handleFollow={handleFollow}
                            handleFavorite={handleFavorite}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionButtons({
    article,
    isSelf,
    isFollowed,
    isFavorited,
    handleEdit,
    handleDelete,
    handleFollow,
    handleFavorite,
}: {
    article: IArticle;
    isSelf: boolean;
    isFollowed: boolean;
    isFavorited: boolean;
    handleDelete: () => void;
    handleEdit: () => void;
    handleFollow: () => void;
    handleFavorite: () => void;
}) {
    return (
        <div>
            {isSelf ? (
                <>
                    <div className="flex gap-3">
                        <ActionButton
                            onClick={handleEdit}
                            activeText="Edit Article"
                            inactiveText=""
                            isActive={true}
                            activeClassName="border border-gray-500 hover:bg-clrGainsboro/40 hover:text-white text-clrDoveGrey"
                            inactiveClassName=""
                            icon={Edit}
                        />
                        <ActionButton
                            onClick={handleDelete}
                            activeText="Delete Article"
                            inactiveText=""
                            isActive={true}
                            activeClassName="border border-clrIndianRed text-clrIndianRed hover:bg-clrIndianRed hover:text-clrHarp"
                            inactiveClassName={twMerge("")}
                            icon={Trash2}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex gap-3">
                        <ActionButton
                            onClick={handleFollow}
                            isActive={isFollowed}
                            icon={isFollowed ? Minus : Plus}
                            activeText={`UnFollow ${article.author.username}`}
                            inactiveText={`Follow ${article.author.username}`}
                            inactiveClassName="border border-gray-500 hover:bg-clrGainsboro/40 hover:text-white text-clrDoveGrey"
                            activeClassName="border border-gray-500 hover:bg-clrGainsboro/40 hover:text-white text-clrDoveGrey"
                        />
                        <ActionButton
                            onClick={handleFavorite}
                            isActive={isFavorited}
                            icon={isFavorited ? Heart : Heart}
                            activeText={`UnFavorite Article (${article.favoritesCount})`}
                            inactiveText={`Favorite Article (${article.favoritesCount})`}
                            inactiveClassName="border border-gray-500  text-clrTurtleGreen hover:bg-clrTurtleGreen hover:text-clrHarp"
                            activeClassName="border border-gray-500 hover:bg-clrTurtleGreen hover:text-clrHarp bg-clrTurtleGreen text-white"
                        />
                    </div>
                </>
            )}
        </div>
    );
}
