import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegister } from "../../services/queryhooks/user.hooks";
import { handleError } from "../../utils/errorUtils";
import { toast } from "react-toastify";

type FormData = {
    username: string;
    email: string;
    password: string;
};
const schema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const { mutateAsync: registerAsync, isPending } = useRegister();

    const onSubmit = async (values: FormData) => {
        try {
            const { data } = await registerAsync(values);

            console.group("register-response");
            console.log("successfully register", data);
            console.groupEnd();

            toast.success("Successfully signed up.");
            navigate("/login");
        } catch (error) {
            handleError(error);
        }
    };
    return (
        <div className="max-w-[1200px] px-10 mx-auto py-2">
            <div className="max-w-[400px] mx-auto py-10">
                <div className="text-center">
                    <h1 className="text-4xl">Sign up</h1>
                    <Link
                        to={"/login"}
                        className="text-sm text-clrTurtleGreen hover:text-clrFernGreen hover:underline font-semibold">
                        Already have an account?
                    </Link>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-2 mt-4">
                    <div className="">
                        <label className="block mb-1 text-clrOsloGrey border-clrHarp  font-titilliumWeb">
                            Username
                        </label>
                        <input
                            className="border border-gray-300  py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                            placeholder="Username"
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label className="block mb-1 text-clrOsloGrey border-clrHarp  font-titilliumWeb">
                            Email
                        </label>
                        <input
                            className="border border-gray-300  py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                            placeholder="Email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label className="block mb-1 text-clrOsloGrey border-clrHarp  font-titilliumWeb">
                            Password
                        </label>
                        <input
                            className="border border-gray-300  py-2 h-10 w-full rounded-md focus-visible:outline-clrTurtleGreen pl-5 text-lg"
                            placeholder="Password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            disabled={isPending}
                            className="bg-clrTurtleGreen hover:bg-clrTurtleGreen/80 text-white font-semibold px-4 rounded-sm p-2 ">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
