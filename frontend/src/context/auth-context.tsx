/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userService } from "../services";
import Cookies from "js-cookie";

export type IUser = {
    id: string;
    email: string;
    username: string;
    bio: string;
    image: string;
    token?: string;
};

type IAuthContext = {
    user?: IUser;

    setUser: (user: IUser) => void;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
    isLoadingUser: boolean;
    setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<IUser>();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoadingUser(true);
        userService
            .getCurrentUser()
            .then((res) => {
                setUser(res?.data);
                setIsLoggedIn(true);
                navigate(location.state?.location);
            })
            .catch((error) => {
                console.log(error);
                setIsLoggedIn(false);
            })
            .finally(() => {
                setIsLoadingUser(false);
            });
    }, [location.state?.location, navigate]);

    const logout = async () => {
        Cookies.remove("con_token");
        setIsLoggedIn(false);
        setUser(undefined);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
                isLoadingUser,
                isLoggedIn,
                setIsLoggedIn,
            }}>
            {isLoadingUser ? null : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
