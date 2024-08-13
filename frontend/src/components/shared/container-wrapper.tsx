import { ReactNode } from "react";

export default function ContainerWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="mx-auto max-w-[1200px] px-10 h-full">
            <div className="">{children}</div>
        </div>
    );
}
