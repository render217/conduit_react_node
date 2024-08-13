import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import LoadingSpinner from "../components/ui/loaders/loading-spineer";

export default function PrivateRoute() {
    const { user, isLoadingUser } = useAuth();

    const location = useLocation();

    if (isLoadingUser) return <LoadingSpinner />;

    if (user == null) {
        return <Navigate to="/login" replace state={{ location }} />;
    }

    return <Outlet />;
}
