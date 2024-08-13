import { cn } from "../../utils";

export default function Pagination({
    currentPage,
    itemPerPage,
    totalItems,
    paginate,
}: {
    currentPage: number;
    itemPerPage: number;
    totalItems: number;
    paginate: (pageNo: number) => void;
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="">
            <div className="flex flex-wrap items-center">
                {pageNumbers.map((page) => (
                    <p
                        onClick={() => paginate(page)}
                        key={page}
                        className={cn(
                            "border border-gray-300 py-5 px-2 text-clrTurtleGreen  w-10 h-8 flex items-center justify-center cursor-pointer hover:underline hover:bg-slate-200 text-sm",
                            currentPage === page &&
                                "bg-slate-200 text-clrTurtleGreen underline"
                        )}>
                        {page}
                    </p>
                ))}
            </div>
        </div>
    );
}
