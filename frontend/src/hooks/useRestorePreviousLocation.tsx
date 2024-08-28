import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useRestorePreviousLocation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Store the current path in sessionStorage
        sessionStorage.setItem("previousPath", location.pathname);
    }, [location]);

    useEffect(() => {
        // Check if the app is loaded on root path after a refresh
        if (location.pathname === "/") {
            const previousPath = sessionStorage.getItem("previousPath");
            if (previousPath) {
                navigate(previousPath);
            }
        }
    }, [location, navigate]);
};

export default useRestorePreviousLocation;
