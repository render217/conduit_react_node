import { Minus, Plus, Settings } from "lucide-react";
import { IProfile } from "../../../types";
import { useAuth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import {
    useFollowUser,
    useUnFollowUser,
} from "../../../services/queryhooks/user.hooks";
import { handleError } from "../../../utils/errorUtils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ProfileImage from "../../../components/ui/profile-image";

export default function ProfileBanner({
    profile,
}: {
    profile: IProfile;
    username?: string;
}) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isSelf = profile.id.toString() === user?.id.toString();
    // const targetId = profile.id.toString();

    const { mutateAsync: followUserAsync, isPending: isFollowPending } =
        useFollowUser();
    const { mutateAsync: unFollowUserAsync, isPending: isUnFollowPending } =
        useUnFollowUser();

    const isFollowed = profile?.following;

    const handleFollowUnFollow = async () => {
        const targetFn = isFollowed ? unFollowUserAsync : followUserAsync;
        try {
            await targetFn(profile.username);

            const toastMsg = isFollowed
                ? "Successfully unfollowed"
                : "Successfully followed";

            queryClient.invalidateQueries({
                queryKey: ["profile", profile.username],
            });
            toast.success(toastMsg);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="h-[200px]  shadow-md shadow-slate-200 bg-clrGainsboro">
            <div className=" max-w-[1200px] mx-auto w-full px-10 h-full flex  items-center">
                <div className="max-w-[900px] mx-auto w-full">
                    <div className="flex flex-col gap-2 text-center justify-center ">
                        <div className="h-20 w-20 mx-auto rounded-full overflow-hidden">
                            <ProfileImage image={profile.image} />
                        </div>
                        <h1 className="text-2xl font-titilliumWeb font-bold text-black">
                            {profile.username}
                        </h1>
                        <div className="flex justify-end">
                            {isSelf ? (
                                <button
                                    onClick={() => navigate(`/settings`)}
                                    className="text-sm py-1 px-2 border border-gray-500 rounded-sm hover:bg-gray-300 flex items-center gap-1 text-gray-500">
                                    <Settings className="size-4" />
                                    <p className="text-xs font-semibold">
                                        Edit Profile Settings
                                    </p>
                                </button>
                            ) : (
                                <button
                                    disabled={
                                        isFollowed
                                            ? isUnFollowPending
                                            : isFollowPending
                                    }
                                    onClick={handleFollowUnFollow}
                                    className="text-sm py-1 px-2 border border-gray-500 rounded-sm hover:bg-gray-300 flex items-center gap-1 text-gray-500">
                                    {isFollowed ? (
                                        <Minus className="size-4" />
                                    ) : (
                                        <Plus className="size-4" />
                                    )}
                                    <p className="text-xs font-semibold">
                                        {isFollowed
                                            ? `UnFollow ${profile.username}`
                                            : `Follow ${profile.username}`}
                                    </p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
