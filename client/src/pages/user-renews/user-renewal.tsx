import "./user-Renewal.css";
import { useNavigate } from "react-router";
import logo from "../../assets/CPECB-Logo.png";
import { useSubmittedData } from "../../services/api/register";

export default function UserRenewal() {
  const navigate = useNavigate();

  const {data: registered_people} = useSubmittedData();

  return (
    <div className="row vh-100 p-0 m-0">
      <div className="sidebar col-sm-2 text-center border-end">
        <img src={logo} className="logo img-fluid" />
        <div className="pt-5">
          <button
            className="btn side-btn w-100 py-2 my-3 fs-5"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </button>
          <button
            className="btn side-btn w-100 py-2 my-3 fs-5"
            onClick={() => navigate("/user-renewals")}
          >
            Renewals
          </button>
        </div>
      </div>
      <div className="col-sm-10 bg-light">
        <h1 className="pt-3">List of New Renewals</h1>
        <div className="table-responsive pt-5">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Renewal Type</th>
                <th>Batch No.</th>
              </tr>
            </thead>
            <tbody className="fs-5">
              {registered_people && registered_people.response.map((renewal) => (
                <tr key={renewal.id} onClick={() => navigate(`/user-renewals/user-info/${renewal.id}`)} className="user-link">
                  <td>{renewal.name.firstName}</td>
                  <td>{renewal.name.lastName}</td>
                  <td>{renewal.type}</td>
                  <td>{renewal.batchNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
