import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function PrivateRoute() {
    const { user } = useAuth();

    const location = useLocation();

    if (user === undefined) {
        return <Navigate to="/login" replace state={{ location }} />;
    }

    return <Outlet />;
}
