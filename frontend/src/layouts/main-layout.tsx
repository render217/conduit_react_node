import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";

export default function MainLayout() {
    return (
        <div className="flex  flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 h-full w-full relative">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
