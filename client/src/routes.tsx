import Dashboard from "./pages/dashboard/Dashboard";
import Renewal from "./pages/renewal/Renewal";
import { createBrowserRouter } from "react-router-dom";
import UploadPictures from "./pages/renewal/includes/UploadPictures";
import Consent from "./pages/renewal/includes/Consent";
import Register from "./pages/register/Register";
import Upload from "./pages/register/includes/Upload";
import ConsentRegister from "./pages/register/includes/Consent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register/upload-pictures",
    element: <Upload />,
  },
  {
    path: "/register/consent",
    element: <ConsentRegister />,
  },
]);
