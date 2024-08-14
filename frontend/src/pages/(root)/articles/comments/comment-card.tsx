import { Trash2 } from "lucide-react";
import { IComment } from "../../../../types";
import { useDeleteComment } from "../../../../services/queryhooks/article.hooks";
import { toast } from "react-toastify";
import { handleError } from "../../../../utils/errorUtils";
import { useAuth } from "../../../../context/auth-context";
import FormattedDate from "../../../../components/ui/formattedDate";
import { Link } from "react-router-dom";

export default function CommentCard({
    articleSlug,
    comment,
}: {
    articleSlug: string;
    comment: IComment;
}) {
    const { user } = useAuth();
    const { mutateAsync: deleteCommentAsync, isPending } =
        useDeleteComment(articleSlug);

    // check if it is the author

    const isAuthor = comment.author.id.toString() === user?.id.toString();

    const handleDeleteComment = async () => {
        if (isPending || !isAuthor) return;
        try {
            await deleteCommentAsync(comment.id.toString());
            // const { data } = await deleteCommentAsync(comment.id.toString());
            // console.log(data);
            toast.success("successfully deleted comment");
        } catch (error) {
            handleError(error);
        }
    };
    const authorImage =
        comment.author.image !== "" ? comment.author.image : "/profile.png";
    return (
        <div className=" max-w-[800px]  border border-gray-300  rounded-md">
            <div className="py-3 px-4">{comment.body}</div>
            <div className="flex justify-between bg-clrMercury items-center  py-3 px-2">
                <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Link to={`/profile/${comment.author.username}`}>
                            <img
                                className="object-cover "
                                src={authorImage}
                                alt="author"
                            />
                        </Link>
                    </div>
                    <p className="text-xs font-semibold hover:underline underline-offset-2">
                        <Link to={`/profile/${comment.author.username}`}>
                            {comment.author.username}
                        </Link>
                    </p>
                    <p className="text-xs">
                        <FormattedDate timestamp={comment.createdAt} />
                    </p>
                </div>
                {isAuthor && (
                    <Trash2
                        onClick={handleDeleteComment}
                        className="hover:text-red-500 cursor-pointer size-5"
                    />
                )}
            </div>
        </div>
    );
}
