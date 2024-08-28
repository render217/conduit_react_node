import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
    return (
        <div className="absolute size-full grid place-content-center">
            <LoaderCircle
                className="animate-spin  text-clrTurtleGreen"
                size={30}
            />
        </div>
    );
}
