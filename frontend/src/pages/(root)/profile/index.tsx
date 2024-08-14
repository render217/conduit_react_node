import { useEffect, useState } from "react";
import ProfileBanner from "./profile-banner";
import ArtilceList from "../articles/article-list";

import { useParams } from "react-router-dom";
import { useGetProfile } from "../../../services/queryhooks/user.hooks";
import PageLoader from "../../../components/ui/loaders/page-loader";
import { IProfile, ITab } from "../../../types";
import TabItem from "../../../components/ui/tabs/tab-item";
import { useAuth } from "../../../context/auth-context";
import { TAB_TYPE_ENUM } from "../../../utils/constants";

export default function Profile() {
    const params = useParams();
    // console.log({ params });
    const username = (params.username as string) || "";
    const { user } = useAuth();

    const [isSelf, setIsSelf] = useState(
        user?.username.toLowerCase() === username.toLowerCase()
    );

    useEffect(() => {
        if (user?.username.toLowerCase() === username.toLowerCase()) {
            setIsSelf(true);
        } else {
            setIsSelf(false);
        }
    }, [user, username]);

    const [tabs, setTabs] = useState<ITab[]>([
        {
            label: isSelf ? `Your's Articles` : `${username}'s Articles`,
            val: username,
            type: TAB_TYPE_ENUM.users_article.type,
        },
        {
            label: "Favorited Articles",
            val: username,
            type: TAB_TYPE_ENUM.users_favorite_article.type,
        },
    ]);

    // Sync the tabs state with the current isSelf and username values
    useEffect(() => {
        setTabs([
            {
                label: isSelf ? `Your's Articles` : `${username}'s Articles`,
                val: username,
                type: TAB_TYPE_ENUM.users_article.type,
            },
            {
                label: "Favorited Articles",
                val: username,
                type: TAB_TYPE_ENUM.users_favorite_article.type,
            },
        ]);
    }, [isSelf, username]);

    const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

    const { data: responseData, isLoading } = useGetProfile(username);

    if (isLoading) {
        return (
            <div className="">
                <PageLoader />
            </div>
        );
    }

    const profile = responseData?.data?.profile as IProfile;

    if (!profile) return <p>Something went wrong</p>;

    return (
        <div className="">
            <ProfileBanner profile={profile} username={username} />
            <div className="mx-auto max-w-[1200px] px-10 h-full pt-8">
                <div className="max-w-[1000px] mx-auto">
                    <div className="md:col-span-6">
                        <div>
                            <div className="flex gap-2 items-center border-b border-clrMercury">
                                {tabs.map((tab) => {
                                    return (
                                        <TabItem
                                            tab={tab}
                                            key={tab.label}
                                            setActiveTab={setActiveTab}
                                            activeTab={activeTab}
                                        />
                                    );
                                })}
                            </div>
                            <div className="py-8">
                                <ArtilceList activeTab={activeTab} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
