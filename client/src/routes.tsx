import Dashboard from "./pages/dashboard/Dashboard";
import Renewal from "./pages/renewal/Renewal";
import { createBrowserRouter } from "react-router-dom";
import UploadPictures from "./pages/renewal/includes/UploadPictures";
import Consent from "./pages/renewal/includes/Consent";
import Register from "./pages/register/Register";
import UserRenewal from "./pages/user-renews/user-renewal";
import UserRenewalInfo from "./pages/user-renews/includes/userRenewal-Info";
import Login from "./pages/login/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user-renewals",
    element: <UserRenewal />,
  },
  {
    path: "/user-renewals/user-info/:id",
    element: <UserRenewalInfo />,
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
  
]);
