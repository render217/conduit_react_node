import { Route, Routes } from "react-router-dom";
// import Navbar from "../components/shared/navbar";

// import Footer from "../components/shared/footer";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants";
import MainLayout from "../layouts/main-layout";
import NotFound from "../pages/(root)/NotFound";
import PrivateRoute from "./private-route";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    {PUBLIC_ROUTES.map((route) => {
                        const Element = route.element;
                        return (
                            <Route
                                key={route.key}
                                path={route.path}
                                element={Element}
                            />
                        );
                    })}
                    <Route element={<PrivateRoute />}>
                        {PRIVATE_ROUTES.map((route) => {
                            const Element = route.element;
                            return (
                                <Route
                                    key={route.key}
                                    path={route.path}
                                    element={Element}
                                />
                            );
                        })}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default AllRoutes;
