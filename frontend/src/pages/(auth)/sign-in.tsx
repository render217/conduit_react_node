import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { cn } from "../../utils";
import { useLogin } from "../../services/queryhooks/user.hooks";

import { handleError } from "../../utils/errorUtils";
import { useAuth } from "../../context/auth-context";
import { LoaderCircle } from "lucide-react";
type FormData = {
    email: string;
    password: string;
};
const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();
    const location = useLocation();

    const { setUser, setIsLoggedIn } = useAuth();
    const { mutateAsync: loginAsync, isPending } = useLogin();

    const onSubmit = async (values: FormData) => {
        if (isPending) return;
        try {
            const { data } = await loginAsync(values);

            // console.group("login-response");
            // console.log("successfully logged in", { data });
            // console.groupEnd();

            navigate(location.state?.location ?? "/");
            setUser(data?.user);
            setIsLoggedIn(true);
            Cookies.set("con_token", data?.user?.token);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="max-w-[1200px] px-10 mx-auto py-2">
            <div className="max-w-[400px] mx-auto py-10">
                <div className="text-center">
                    <h1 className="text-4xl">Sign in</h1>
                    <Link
                        to={"/register"}
                        className="text-sm text-clrTurtleGreen hover:text-clrFernGreen font-semibold">
                        Need an account?
                    </Link>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 mt-4">
                    <div className="">
                        <label className="block mb-1 text-clrOsloGrey border-clrHarp  font-titilliumWeb">
                            Email
                        </label>
                        <input
                            disabled={isPending}
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
                            disabled={isPending}
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
                            className={cn(
                                "bg-clrTurtleGreen hover:bg-clrTurtleGreen/80 text-white font-semibold px-4 rounded-sm p-2 w-20",
                                isPending &&
                                    "cursor-not-allowed bg-clrTurtleGreen/80"
                            )}>
                            {isPending ? (
                                <LoaderCircle className="animate-spin mx-auto" />
                            ) : (
                                <p>Sign In</p>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
