import { ITab } from "../../../types";
import { cn } from "../../../utils";

type TabItemProp = {
    activeTab: ITab;

    tab: ITab;
    setActiveTab: (selectedTab: ITab) => void;
};
export default function TabItem({ activeTab, tab, setActiveTab }: TabItemProp) {
    const isActive = activeTab.label === tab.label;

    const handleSelectTab = () => {
        setActiveTab(tab);
    };
    return (
        <p
            onClick={handleSelectTab}
            key={tab.val}
            className={cn(
                ` border-b  hover:border-b-clrTurtleGreen hover:text-clrFernGreen cursor-pointer  font-medium py-2 min-w-[100px] text-center`,
                isActive
                    ? "border-b-clrTurtleGreen text-clrFernGreen"
                    : "border-transparent text-clrDoveGrey"
            )}>
            {tab.label}
        </p>
    );
}
