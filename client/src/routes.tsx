import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/register/Register";
import UserRenewal from "./pages/user-renews/user-renewal";
import UserRenewalInfo from "./pages/user-renews/includes/userRenewal-Info";
import Login from "./pages/login/login";
import SideBar from "./components/sidebar/SideBar";



export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <SideBar />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "user-renewals",
        element: <UserRenewal />,
      },
      {
        path: "user-registers",
        element: <UserRenewal />,
      },
      {
        path: "user-renewals/user-info/:id",
        element: <UserRenewalInfo />,
      },
      {
        path: "user-registers/user-info/:id",
        element: <UserRenewalInfo />,
      },
    ],
  },
  {
    path: "/renewal",
    element: <Register />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
