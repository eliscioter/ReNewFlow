import { useNavigate } from "react-router";
export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="parent-bg p-5 vh-100">
      <div className="container bg-light border p-3 rounded-4">
        <h4>Registration Form</h4>
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
                <select
                  className="form-select"
                  id="gender"
                  aria-label="Floating label select example"
                >
                  <option selected>Open this select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <label>Gender</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-start mt-3">
              <button
                className="btn border back-btn fw-bold w-25"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
            <div className="col text-end mt-3">
              <button
                className="btn border next-btn text-white fw-bold w-25"
                onClick={() => navigate("/register/upload-pictures")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
