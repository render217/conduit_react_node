import { FilePenLine, Settings as SettingsIcon, User } from "lucide-react";
import ArticleCreate from "../pages/(root)/articles/article-create";
import Settings from "../pages/(root)/settings";
import Profile from "../pages/(root)/profile";
import Home from "../pages/(root)/home";
import { SignIn, SignUp } from "../pages/(auth)";
import ArticleDetail from "../pages/(root)/articles/article-detail";
import ArticleEdit from "../pages/(root)/articles/article-edit";

export const PRIVATE_ROUTES = [
    {
        key: "new-article",
        label: "New Article",
        path: "/editor",
        icon: FilePenLine,
        element: <ArticleCreate />,
    },
    {
        key: "edit-article",
        label: "Edit Article",
        path: "/editor/:articleSlug/edit",
        icon: FilePenLine,
        element: <ArticleEdit />,
    },
    {
        key: "settings",
        label: "Settings",
        path: "/settings",
        icon: SettingsIcon,
        element: <Settings />,
    },
    // {
    //     key: "article-detail",
    //     label: "",
    //     path: "/articles/:articleSlug",
    //     icon: null,
    //     element: <ArticleDetail />,
    // },

    // {
    //     key: "profile",
    //     label: "Profile",
    //     path: "/profile/:username",
    //     icon: User,
    //     element: <Profile />,
    // },
];

export const PUBLIC_ROUTES = [
    {
        key: "home",
        label: "Home",
        path: "/",
        icon: null,
        element: <Home />,
    },
    {
        key: "signIn",
        label: "Sign In",
        path: "/login",
        icon: null,
        element: <SignIn />,
    },
    {
        key: "signUp",
        label: "Sign Up",
        path: "/register",
        icon: null,
        element: <SignUp />,
    },
    {
        key: "article-detail",
        label: "",
        path: "/articles/:articleSlug",
        icon: null,
        element: <ArticleDetail />,
    },

    {
        key: "profile",
        label: "Profile",
        path: "/profile/:username",
        icon: User,
        element: <Profile />,
    },
];

export const NAV_ROUTES = [
    {
        key: "home",
        label: "Home",
        path: "/",
        private: false,
        icon: null,
        element: <Home />,
    },
    {
        key: "new-article",
        label: "New Article",
        path: "/editor",
        private: true,
        icon: FilePenLine,
        element: <ArticleCreate />,
    },
    {
        key: "settings",
        label: "Settings",
        path: "/settings",
        private: true,
        icon: SettingsIcon,
        element: <Settings />,
    },
    {
        key: "profile",
        label: "Profile",
        path: "/profile",
        private: true,
        icon: User,
        element: <Profile />,
    },
    {
        key: "signIn",
        label: "Sign In",
        path: "/login",
        private: false,
        icon: null,
        element: <SignIn />,
    },
    {
        key: "signUp",
        label: "Sign Up",
        path: "/register",
        private: false,
        icon: null,
        element: <SignUp />,
    },
];
