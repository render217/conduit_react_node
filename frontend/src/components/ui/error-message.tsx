import { Link } from "react-router-dom";

export default function ErrorMessage({
    msg = "Something went wrong",
}: {
    msg?: string;
}) {
    return (
        <div className="absolute h-full w-full ">
            <div className="min-h-[40vh] flex flex-col gap-3 items-center justify-center">
                <h1 className="text-3xl font-semibold font-titilliumWeb">
                    {msg}
                </h1>
                <Link to={"/"}>
                    <button className="text-clrTurtleGreen border hover:bg-clrTurtleGreen hover:text-white border-clrTurtleGreen px-2 text-sm py-2 rounded-md font-titilliumWeb transition-all duration-200">
                        Go to home Page
                    </button>
                </Link>
            </div>
        </div>
    );
}
