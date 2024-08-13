import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes";
import AuthProvider from "./context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient({});
export default function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AllRoutes />
                </AuthProvider>
                <ToastProvider />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

function ToastProvider() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    );
}
