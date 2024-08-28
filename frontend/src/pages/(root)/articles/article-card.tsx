import { Heart, LoaderCircle } from "lucide-react";
import { IArticle } from "../../../types";
import { Link } from "react-router-dom";

import FormattedDate from "../../../components/ui/formattedDate";
import {
    useFavoriteArticle,
    useUnFavoriteArticle,
} from "../../../services/queryhooks/article.hooks";
import { handleError } from "../../../utils/errorUtils";
import { useQueryClient } from "@tanstack/react-query";
import { cn, truncateText } from "../../../utils";

type ArticleCardProps = { article: IArticle };
export default function ArticleCard({ article }: ArticleCardProps) {
    const queryClient = useQueryClient();
    const authorImage =
        article.author.image !== "" ? article.author.image : "/profile.png";
    const isFavorited = article.favorited;
    const {
        mutateAsync: favoriteArticleAsync,
        isPending: isFavoriteArticlePending,
    } = useFavoriteArticle();

    const {
        mutateAsync: unFavoriteArticleAsync,
        isPending: isUnFavoriteArticlePending,
    } = useUnFavoriteArticle();

    const handleFavorite = async () => {
        const targetFn = isFavorited
            ? unFavoriteArticleAsync
            : favoriteArticleAsync;
        try {
            await targetFn(article.slug);
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Link to={`/profile/${article.author.username}`}>
                            <img
                                className="object-cover "
                                src={authorImage}
                                alt="author"
                            />
                        </Link>
                    </div>
                    <div className="">
                        <p
                            className={cn(
                                "text-sm text-clrTurtleGreen hover:underline underline-offset-2"
                            )}>
                            <Link to={`/profile/${article.author.username}`}>
                                {article.author.username}
                            </Link>
                        </p>
                        <p className="text-xs">
                            <FormattedDate timestamp={article.updatedAt} />
                        </p>
                    </div>
                </div>
                <div>
                    <button
                        disabled={
                            isFavoriteArticlePending ||
                            isUnFavoriteArticlePending
                        }
                        onClick={handleFavorite}
                        className={cn(
                            " hover:bg-clrTurtleGreen/80 hover:text-white px-2 rounded-sm py-1 text-sm flex gap-1 items-center text-white justify-center border",
                            isFavorited
                                ? "bg-clrTurtleGreen text-white border-clrTurtleGreen"
                                : "bg-transparent border border-clrTurtleGreen text-clrTurtleGreen"
                        )}>
                        {isFavoriteArticlePending ||
                        isUnFavoriteArticlePending ? (
                            <LoaderCircle className="font-semibold size-3.5 animate-spin" />
                        ) : (
                            <Heart className="font-semibold  size-3.5" />
                        )}
                        <p className="font-semibold ">
                            {article.favoritesCount}
                        </p>
                    </button>
                </div>
            </div>
            <h1 className="text-2xl mt-5 mb-2 text-black/80 font-semibold font-merriweatherSans">
                <Link to={`/articles/${encodeURIComponent(article.slug)}`}>
                    {article.title}
                </Link>
            </h1>
            <p className="text-clrOsloGrey font-sourceSans3">
                {truncateText(article.description, 400)}
            </p>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-xs ">
                    <Link to={`/articles/${encodeURIComponent(article.slug)}`}>
                        Read more...
                    </Link>
                </p>
                <div className="flex items-center gap-2">
                    {article.tagList.map((tag, idx) => (
                        <p
                            className="border border-clrGainsboro rounded-md px-2 text-xs"
                            key={idx}>
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
