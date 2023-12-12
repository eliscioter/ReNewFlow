import "./user-Renewal.css";
import { useNavigate } from "react-router";
import { useSubmittedData } from "../../services/api/demographics";

export default function UserRenewal() {
  const navigate = useNavigate();

  const { data: registered_people } = useSubmittedData();

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
            {registered_people &&
              registered_people.response.map((renewal) => (
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
