import Dashboard from "./pages/dashboard/Dashboard";
import Renewal from "./pages/renewal/Renewal";
import { createBrowserRouter } from "react-router-dom";
import UploadPictures from "./pages/renewal/includes/UPloadPictures";
import Consent from "./pages/renewal/includes/Consent";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/renewal",
        element: <Renewal />,
    },
    {
        path: "/renewal/upload-pictures",
        element: <UploadPictures />,
    },
    {
        path: "/renewal/consent",
        element: <Consent />,
    },
])