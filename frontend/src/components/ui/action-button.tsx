import { LucideIcon } from "lucide-react";
// import { cn } from "../../utils";

import { cn } from "../../utils";
type ActionButtonProp = {
    onClick: () => void;
    isActive: boolean;
    activeText: string;
    inactiveText: string;
    activeClassName: string;
    inactiveClassName: string;
    icon: LucideIcon;
    count?: number;
};
const ActionButton = ({
    onClick,
    isActive,
    activeText,
    inactiveText,
    activeClassName,
    inactiveClassName,
    icon: Icon,
    count,
}: ActionButtonProp) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm py-1 px-2  rounded-sm flex items-center gap-1",
                isActive ? activeClassName : inactiveClassName
            )}>
            <Icon className="size-4" />
            <p className="text-xs font-semibold">
                {isActive ? activeText : inactiveText}
                {count !== undefined && ` (${count})`}
            </p>
        </button>
    );
};

export default ActionButton;
