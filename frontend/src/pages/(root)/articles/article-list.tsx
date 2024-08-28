/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
// import Pagination from "../../../components/shared/pagination";
import { useGetArticles } from "../../../services/queryhooks/article.hooks";
import { IArticle, ITab } from "../../../types";
import {
    getActiveTabQuery,
    // getActiveTabQueryWithPagination,
} from "../../../utils";
import ArticleCard from "./article-card";
import PageLoader from "../../../components/ui/loaders/page-loader";
import Pagination from "../../../components/shared/pagination";
import { Loader, LoaderCircle } from "lucide-react";
// import ReactPaginate from "react-paginate";
// import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

export default function ArtilceList({ activeTab }: { activeTab: ITab }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, _] = useState(5);

    const query = getActiveTabQuery(activeTab);
    // const query = getActiveTabQueryWithPagination(activeTab, 1);

    const { data: axiosResponse, isLoading, isError } = useGetArticles(query);

    const articles = (axiosResponse?.data?.articles as IArticle[]) || [];

    // Get current articles
    const indexOfLastArticle = currentPage * itemPerPage;
    const indexOfFirstArticle = indexOfLastArticle - itemPerPage;
    const currentArticles = articles.slice(
        indexOfFirstArticle,
        indexOfLastArticle
    );
    const paginate = (pageNo: number) => {
        setCurrentPage(pageNo);
    };

    useEffect(() => {
        if (articles.length < itemPerPage) setCurrentPage(1);
    }, [articles, itemPerPage]);

    if (isLoading)
        return (
            <div className="grid place-content-center min-h-[200px]">
                <LoaderCircle className="animate-spin text-clrTurtleGreen" />
            </div>
        );
    if (isError) return <p>Something went wrong</p>;
    return (
        <div>
            <p>{activeTab.label}</p>
            <div className="space-y-10 rounded-md p-2">
                {currentArticles.map((article) => (
                    <div
                        className="min-h-[250px] border rounded-md p-4"
                        key={article.id}>
                        <ArticleCard article={article} />
                    </div>
                ))}
            </div>
            <div className="p-2">
                <Pagination
                    currentPage={currentPage}
                    itemPerPage={itemPerPage}
                    totalItems={articles.length}
                    paginate={(pageNo: number) => {
                        paginate(pageNo);
                    }}
                />
            </div>
        </div>
    );
}

{
    /* <ReactPaginate
                    nextLabel={
                        <CircleArrowRight className="text-clrTurtleGreen rounded-full hover:bg-slate-200" />
                    }
                    previousLabel={
                        <CircleArrowLeft className="text-clrTurtleGreen rounded-full hover:bg-slate-200" />
                    }
                    breakLabel="..."
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="flex space-x-2 items-center"
                    pageClassName="border border-gray-300  text-clrTurtleGreen  w-10 h-8 flex items-center justify-center cursor-pointer hover:underline hover:bg-slate-200 text-sm h-fit"
                    pageLinkClassName="flex items-center justify-center w-full py-2"
                    activeLinkClassName="text-clrTurtleGreen underline bg-slate-200 "
                /> */
}
