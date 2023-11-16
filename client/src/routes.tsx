import Dashboard from "./pages/dashboard/Dashboard";
import Renewal from "./pages/renewal/Renewal";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/renewal",
        element: <Renewal />
    }
])