import { LoaderCircle } from "lucide-react";

export default function PageLoading() {
    return (
        <div className="fixed inset-0">
            <div className="size-full place-content-center grid">
                <LoaderCircle className="animate-spin size-10 text-clrTurtleGreen" />
            </div>
        </div>
    );
}
