import { useGetComments } from "../../../../services/queryhooks/article.hooks";
import { IComment } from "../../../../types";
import CommentCard from "./comment-card";

export default function Comments({ articleSlug }: { articleSlug: string }) {
    const {
        data: responseData,
        isLoading,
        isError,
    } = useGetComments(articleSlug);

    if (isLoading) return <p>loading...</p>;
    if (isError) return <p>Something went wrong</p>;

    const comments = responseData?.data?.comments as IComment[];

    return (
        <div className="flex flex-col gap-5">
            {comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <CommentCard
                            articleSlug={articleSlug}
                            comment={comment}
                        />
                    </div>
                );
            })}
        </div>
    );
}
