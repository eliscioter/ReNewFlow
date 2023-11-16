import { useNavigate } from "react-router";
import "./Renewal.css"
export default function Renewal() {
  const navigate = useNavigate();

  return (
    <div className="container p-5">
      <div className="border p-3">
        <h4>Renewal Form</h4>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Dela Cruz"
                />
                <label>Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  placeholder="Santos"
                />
                <label>Middle Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="zipCode"
                  placeholder="1106"
                />
                <label>Zip Code</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="09123456789"
                />
                <label>Philippine Cell Phone Number</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="juan"
                />
                <label>First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="your address"
                />
                <label>Philippine Permanent Mailing Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="birthPlace"
                  placeholder="Manila City"
                />
                <label>Place of Birth</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="ICEPEPRegion"
                  placeholder="ICEPEP Region"
                />
                <label>Member of ICPEP Region</label>
              </div>
              <div className="text-end mt-3">
                <button
                  className="btn border next-btn text-white"
                  onClick={() => navigate("/renewal/upload-pictures")}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
