import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IUser, useAuth } from "../../context/auth-context";
import { useUpdateUser } from "../../services/queryhooks/user.hooks";
import { toast } from "react-toastify";
import { handleError } from "../../utils/errorUtils";
type FormData = {
    image?: string;
    username: string;
    bio?: string;
    email: string;
    password?: string;
};
const schema = yup
    .object({
        image: yup.string().optional(),
        username: yup.string().required(),
        bio: yup.string().optional(),
        email: yup.string().required(),
        password: yup.string().optional(),
    })
    .required();

export default function SettingForm({ profile }: { profile: IUser }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: profile?.username || "",
            bio: profile?.bio || "",
            email: profile?.email || "",
            image: profile?.image || "",
            password: "",
        },
    });

    const { logout } = useAuth();
    const { mutateAsync: updateUserAsync, isPending } = useUpdateUser();
    const onSubmit = async (values: FormData) => {
        try {
            const payload = { user: { ...values } };
            await updateUserAsync(payload);
            // const { data } = await updateUserAsync(payload);

            // console.log("successfulyy updated user", data);
            toast.success("Successfully updated user");
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="max-w-[800px] mx-auto relative">
            <h1 className="text-4xl text-center font-titilliumWeb mt-4">
                Your Settings
            </h1>
            <button
                onClick={logout}
                className="text-white bg-red-500 px-2 py-1 rounded-sm text-sm absolute top-1 right-0">
                Logout
            </button>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-10 max-w-[800px] shadow-md border-clrTurtleGreen/40 mt-4 mx-auto space-y-4  border  rounded-md">
                <div className="">
                    <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                        Profile Image link
                    </label>
                    <input
                        className="border border-gray-300  py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                        placeholder="Image link"
                        {...register("image")}
                    />
                </div>
                <div className="">
                    <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                        Username
                    </label>
                    <input
                        className="border border-gray-300  py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                        placeholder="Enter your username "
                        {...register("username")}
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500">
                            This field is required
                        </p>
                    )}
                </div>
                <div className="">
                    <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                        Bio
                    </label>
                    <textarea
                        className="border border-gray-300  py-2 h-[150px] w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                        placeholder="Short bio about you "
                        {...register("bio")}
                    />
                </div>
                <div className="">
                    <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                        Email
                    </label>
                    <input
                        className="border border-gray-300 py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                        placeholder="Email "
                        type="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500">
                            This field is required
                        </p>
                    )}
                </div>
                <div className="">
                    <label className="block mb-1 text-clrOsloGrey border-clrHarp text-lg font-titilliumWeb">
                        Password
                    </label>
                    <input
                        className="border border-gray-300 py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                        placeholder="Enter new password "
                        {...register("password")}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        disabled={isPending}
                        className=" bg-clrTurtleGreen text-white p-2 rounded-md font-titilliumWeb hover:bg-clrTurtleGreen/80">
                        Update Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
