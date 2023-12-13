import { useLocation } from "react-router-dom";
import {
  useRegisteredPeople,
  useRenewalPeople,
} from "../../services/api/demographics";
import "./user-Renewal.css";
import { useNavigate } from "react-router";

export default function UserRenewal() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: renewed } = useRenewalPeople();
  const { data: registered } = useRegisteredPeople();

  return (
    <div className="bg-light p-2">
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
            {pathname === "/user-renewals"
              ? renewed &&
                renewed.response.map((renewal) => (
                  <tr
                    key={renewal.id}
                    onClick={() =>
                      navigate(`/user-renewals/user-info/${renewal.id}`)
                    }
                    className="user-link"
                  >
                    <td>{renewal.name.firstName}</td>
                    <td>{renewal.name.lastName}</td>
                    <td>{renewal.type}</td>
                    <td>{renewal.batchNo}</td>
                  </tr>
                ))
              : registered &&
                registered.response.map((register) => (
                  <tr
                    key={register.id}
                    onClick={() =>
                      navigate(`/user-registers/user-info/${register.id}`)
                    }
                    className="user-link"
                  >
                    <td>{register.name.firstName}</td>
                    <td>{register.name.lastName}</td>
                    <td>{register.type}</td>
                    <td>{register.batchNo}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
