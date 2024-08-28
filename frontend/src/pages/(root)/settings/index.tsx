import { LoaderCircle } from "lucide-react";
import SettingForm from "../../../components/forms/setting-form";
import ContainerWrapper from "../../../components/shared/container-wrapper";
import { IUser } from "../../../context/auth-context";
import { useCurrentUser } from "../../../services/queryhooks/user.hooks";

export default function Settings() {
    const { data: responseData, isLoading } = useCurrentUser();

    const user = responseData?.data as IUser;

    if (isLoading) {
        return (
            <div className="grid place-content-center min-h-[200px]">
                <LoaderCircle className="animate-spin text-clrTurtleGreen" />
            </div>
        );
    }
    return (
        <div className="">
            <ContainerWrapper>
                <SettingForm profile={user} />
            </ContainerWrapper>
        </div>
    );
}
