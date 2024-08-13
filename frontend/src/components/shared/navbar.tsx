import { AlignJustify, LucideIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { NAV_ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
export default function Navbar() {
    const { isLoggedIn } = useAuth();

    return (
        <header className="h-[56px] flex items-center border-b border-b-clrGainsboro shadow-md">
            <div className="max-w-[1200px] mx-auto w-full px-10 h-full flex items-center ">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-3xl cursor-pointer text-clrTurtleGreen font-bold font-titilliumWeb">
                        <Link to={"/"}>conduit</Link>
                    </h1>
                    <div className="font-sourceSans3">
                        <AlignJustify
                            size={36}
                            className="sm:hidden text-clrTurtleGreen font-bold text-xl cursor-pointer"
                        />
                        {
                            <div className="flex items-center gap-4 max-sm:hidden">
                                {NAV_ROUTES.filter((x) =>
                                    isLoggedIn
                                        ? x.private || x.key === "home"
                                        : !x.private || x.key === "home"
                                ).map((route) => {
                                    return (
                                        <NavItem
                                            key={route.key}
                                            navItem={route}
                                        />
                                    );
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}
type INavItem = {
    key: string;
    label: string;
    path: string;
    private: boolean;
    icon: LucideIcon | null;
    element: JSX.Element;
};

function NavItem({ navItem }: { navItem: INavItem }) {
    const { user } = useAuth();
    const routePath =
        navItem.key === "profile" ? `/profile/${user?.username}` : navItem.path;

    return (
        <NavLink
            key={navItem.key}
            className={({ isActive }) =>
                isActive
                    ? "text-black"
                    : "text-clrOsloGrey hover:text-clrDoveGrey"
            }
            to={routePath}>
            <div className="flex items-center gap-1">
                {navItem.icon && <navItem.icon />}
                <span className="text-sm">{navItem.label}</span>
            </div>
        </NavLink>
    );
}
