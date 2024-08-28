import { useState } from "react";
import Banner from "./banner";

import ArtilceList from "../articles/article-list";
import { useGetTags } from "../../../services/queryhooks/article.hooks";
import { ITab, ITag } from "../../../types";
import { useAuth } from "../../../context/auth-context";
import TabItem from "../../../components/ui/tabs/tab-item";
import { TAB_TYPE_ENUM } from "../../../utils/constants";
import { LoaderCircle } from "lucide-react";

export default function Home() {
    const { user } = useAuth();

    const [tabs, setTabs] = useState<ITab[]>([
        {
            label: "Global Feed",
            val: "",
            type: TAB_TYPE_ENUM.global_feed.type,
        },
        {
            label: `Your Feed`,
            val: user?.username as string,
            type: TAB_TYPE_ENUM.users_article.type,
        },
    ]);

    const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

    const { data: responseData, isLoading } = useGetTags();
    const tags = (responseData?.data?.tags as ITag[]) || [];

    const handleSelectTag = (tagVal: string) => {
        const mappedTag = {
            label: `#${tagVal}`,
            val: tagVal,
            type: TAB_TYPE_ENUM.tag_type.type,
        };
        setActiveTab(mappedTag);
        setTabs((prev) => {
            const prevTabs = [...prev];
            prevTabs[2] = mappedTag;
            return prevTabs;
        });
    };
    return (
        <div className="">
            <Banner />
            <div className="mx-auto max-w-[1200px] px-10 h-full pt-8">
                <div className="grid md:grid-cols-8 md:gap-3 h-full max-md:gap-5">
                    <div className="md:col-span-6">
                        <div>
                            <div className="flex gap-2 items-center border-b border-clrMercury">
                                {tabs.map((tab) => {
                                    return (
                                        <TabItem
                                            key={tab.label}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            tab={tab}
                                        />
                                    );
                                })}
                            </div>
                            <div className="py-8">
                                <ArtilceList activeTab={activeTab} />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-clrHarp p-2 space-y-2 rounded-md h-fit">
                        <p className="text-clrDoveGrey">Popular Tags</p>
                        <div className="rounded-md pb-4 flex flex-wrap gap-2 items-start">
                            {isLoading && (
                                <div className="grid place-content-center  w-full">
                                    <LoaderCircle className="animate-spin text-clrTurtleGreen" />
                                </div>
                            )}
                            {!isLoading &&
                                tags.map((tag) => {
                                    return (
                                        <p
                                            onClick={() =>
                                                handleSelectTag(tag.name)
                                            }
                                            key={tag.name}
                                            className="text-xs border border-clrDoveGrey rounded-full w-fit px-2 py-0.5 text-white cursor-pointer bg-clrOsloGrey hover:bg-clrDoveGrey">
                                            {tag.name} ({tag.count})
                                        </p>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
