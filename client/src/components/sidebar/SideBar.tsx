import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/CPECB-Logo.png";
import "./sidebar.css";
import { useAuth } from "../../services/shared/user";
import { useLogout } from "../../services/api/user";
import { toast } from "sonner";

export default function SideBar() {
  const { pathname } = useLocation();
  const { userId, removeId } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync } = useLogout();

  // TODO: Implement logout properly
  const handleLogout = async () => {
    if (!userId) {
      toast.error("Logout Failed");
      return;
    }
    await mutateAsync({ id: userId });
    removeId();
    toast.success("Logout Success");
    navigate("/login");
  };

  return (
    <>
      {pathname === "/" && <Navigate to={"/dashboard"} />}
      <div className="row vh-100 p-0 m-0">
        <div className="sidebar col-sm-2 text-center border-end p-0 d-block">
          <nav className="">
            <div className="pt-1">
              <a className="navbar-brand w-100 mx-auto" href="/dashboard">
                <img src={logo} className="logo img-fluid" />
              </a>
              <ul className="navbar-nav d-block w-100">
                <li className="nav-item side-btn w-100">
                  <a className="nav-link" aria-current="page" href="/dashboard">
                    Home
                  </a>
                </li>
                <li className="nav-item side-btn w-100">
                  <a className="nav-link" href="/user-registers">
                    Registers
                  </a>
                </li>
                <li className="nav-item side-btn w-100">
                  <a className="nav-link" href="/user-renewals">
                    Renewals
                  </a>
                </li>
                <button className="btn side-btn w-100" onClick={handleLogout}>
                  Logout
                </button>
              </ul>
            </div>
          </nav>
        </div>

        <div className="col-sm-10 p-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}
