import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateComment } from "../../services/queryhooks/article.hooks";
import { toast } from "react-toastify";
import { handleError } from "../../utils/errorUtils";
import { cn } from "../../utils";

// import { handleError } from "../../utils/errorUtils";
// import { toast } from "react-toastify";
type FormData = {
    body: string;
};

const schema = yup
    .object({
        body: yup.string().required(),
    })
    .required();
export default function CommentForm({ articleSlug }: { articleSlug: string }) {
    const { register, handleSubmit, watch, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            body: "",
        },
    });

    const commentVal = watch("body");

    const { mutateAsync: createCommentAsync, isPending } =
        useCreateComment(articleSlug);

    const onSubmit = async (values: FormData) => {
        // console.log(values);
        try {
            await createCommentAsync(values);
            // const { data } = await createCommentAsync(values);
            // console.log({ data });
            reset();
            toast.success("successfully submitted comment");
        } catch (error) {
            handleError(error);
        }
    };
    const isBtnDisabled = commentVal === "" || isPending;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto  border border-gray-300  rounded-md">
            <textarea
                className="border m-0 border-gray-300 py-2  w-full focus-visible:outline-clrTurtleGreen pl-5  min-h-[150px]"
                placeholder="Write a comment..."
                {...register("body")}
            />
            <div className="flex justify-end bg-clrMercury -mt-2 p-2">
                <button
                    disabled={isBtnDisabled}
                    className={cn(
                        `bg-clrTurtleGreen text-white p-2 text-sm rounded-md font-titilliumWeb hover:bg-clrTurtleGreen/80`,
                        isBtnDisabled &&
                            "cursor-not-allowed bg-clrTurtleGreen/50 hover:bg-clrTurtleGreen/50"
                    )}>
                    Post Comment
                </button>
            </div>
        </form>
    );
}
