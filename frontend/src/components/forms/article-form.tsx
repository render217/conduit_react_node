import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateArticle } from "../../services/queryhooks/article.hooks";
import { handleError } from "../../utils/errorUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type FormData = {
    title: string;
    description: string;
    body: string;
    tag: string;
};
const schema = yup
    .object({
        title: yup.string().required(),
        description: yup.string().required(),
        body: yup.string().required(),
        tag: yup.string().required(),
    })
    .required();

export default function ArticleForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const { mutateAsync: createArticleAsync, isPending } = useCreateArticle();
    const onSubmit = async (values: FormData) => {
        try {
            const tagList = values.tag.trim().split(",");
            const payload = { ...values, tagList, tag: undefined };
            const { data } = await createArticleAsync(payload);
            // console.log("newArticle", data);
            toast.success("Successfully created article");
            navigate(`/articles/${data?.article?.slug}`);
            reset();
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 max-w-[800px] shadow-md border-clrTurtleGreen/40 mt-4 mx-auto space-y-4  border  rounded-md">
            <div className="">
                <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                    Title
                </label>
                <input
                    className="border border-gray-300  py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                    placeholder="Article Title "
                    {...register("title")}
                />
            </div>
            <div className="">
                <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                    Description
                </label>
                <textarea
                    className="border border-gray-300  py-2 h-[80px] w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                    placeholder="What's this article about? "
                    {...register("description")}
                />
            </div>
            <div className="">
                <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                    Body
                </label>
                <textarea
                    className="border border-gray-300  py-2 h-[150px] w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                    placeholder="Write your article (in markdown) "
                    {...register("body")}
                />
            </div>
            <div className="">
                <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                    Tag
                </label>
                <input
                    className="border border-gray-300 py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                    placeholder="Enter tags "
                    {...register("tag")}
                />
            </div>
            <div className="flex justify-end">
                <button
                    disabled={isPending}
                    className=" bg-clrTurtleGreen text-white p-2 rounded-md font-titilliumWeb hover:bg-clrTurtleGreen/80">
                    Publish Article
                </button>
            </div>
        </form>
    );
}
