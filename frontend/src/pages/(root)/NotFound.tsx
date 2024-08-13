import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-5xl font-semibold font-titilliumWeb text-clrTurtleGreen">
                    404 Not Found
                </h1>
                <p className="font-light text-xl">
                    Return to
                    <Link
                        className="px-2 underline hover:text-clrTurtleGreen"
                        to={"/"}>
                        home
                    </Link>
                    page
                </p>
            </div>
        </div>
    );
}
