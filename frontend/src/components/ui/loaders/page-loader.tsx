import { Loader2 } from "lucide-react";

export default function PageLoader() {
    return (
        <div className="absolute h-full w-full flex justify-center items-center">
            <Loader2 className="animate-spin  text-clrTurtleGreen" size={30} />
        </div>
    );
}
