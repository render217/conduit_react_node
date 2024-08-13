import SettingForm from "../../../components/forms/setting-form";
import ContainerWrapper from "../../../components/shared/container-wrapper";
import LoadingSpinner from "../../../components/ui/loaders/loading-spineer";
import { IUser } from "../../../context/auth-context";
import { useCurrentUser } from "../../../services/queryhooks/user.hooks";

export default function Settings() {
    const { data: responseData, isLoading } = useCurrentUser();

    const user = responseData?.data as IUser;

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="">
            <ContainerWrapper>
                <SettingForm profile={user} />
            </ContainerWrapper>
        </div>
    );
}
