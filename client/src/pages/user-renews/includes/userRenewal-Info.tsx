import { useNavigate } from "react-router";
import logo from "../../../assets/CPECB-Logo.png";

export default function UserRenewalInfo() {
  const navigate = useNavigate();

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
        <h1 className="pt-3 text-primary">User Renewal Info</h1>
        <form className="p-3">
          <fieldset disabled>
            {/* Personal Information Details */}
            <div className="row">
              <legend className="fw-bold">Personal Information Details</legend>
              <div className="mb-3 border borde-2 border-secondary"></div>
              <div className="col-lg-3 col-md-6 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Bruce"
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Wayne"
                />
              </div>
              <div className="col-lg-2 col-md-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Z"
                />
              </div>
              <div className="col-lg-4 col-md-6 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Philippine Permanent Mailing Address
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="1234 Main St, Gotham City"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Zip Code
                </label>
                <input
                  type="number"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="1669"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Philippine Cellphone Number
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="+63 912 345 6789"
                />
              </div>
              <div className="col-2 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Male"
                />
              </div>
              <div className="col-4 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Place of Birth
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Arkham Asylum"
                />
              </div>
            </div>
            {/* Renewal Form Details */}
            <div className="row pt-5">
              <legend className="fw-bold">Renewal Form Details</legend>
              <div className="mb-3 border borde-2 border-secondary"></div>
              <div className="col-2 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Renewal Application Type
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="CCPE"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  CCPE No.
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="1234-5678-90"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Amount Paid
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Php. 1,000.00"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Batch No.
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="08"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Date of ID Validity (mm/dd/yyyy)
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="08/08/2023"
                />
              </div>
              <div className="col-6 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Bank Name, Location, Date and Time of Deposit/ Transfer
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Bank of Gotham, Gotham City, 08/08/2021 08:08 AM"
                />
              </div>
              <div className="col-3 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Member of ICPEP Region
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Metro Manila"
                />
              </div>
            </div>
            {/* Attachments */}
            <div className="row pt-5">
              <legend className="fw-bold">Attachments</legend>
              <div className="mb-3 border borde-2 border-secondary"></div>
              <div className="col-6 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Title of Regional Attended Activities (at least 2 in the last
                  3 years) with Certificates
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="user2x2.png"
                />
              </div>
              <div className="col-6 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  Title of National Attended Activities (at least 1 in the last
                  3 years) with Certificates
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="user2x2.png"
                />
              </div>
              <div className="col-2 mb-3 fw-medium">
                <label htmlFor="disabledTextInput" className="form-label">
                  2x2 Picture
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="user2x2.png"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
