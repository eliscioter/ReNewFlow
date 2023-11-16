import { createBrowserRouter } from "react-router-dom";
import DashBoard from "./pages/dashboard/Dashboard";
import Renewal from "./pages/renewal/Renewal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />,
    },
    {
        path: "/renewal",
        element: <Renewal />,
    }
]);
