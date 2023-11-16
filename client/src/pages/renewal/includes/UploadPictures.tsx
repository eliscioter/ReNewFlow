import { useNavigate } from "react-router";

export default function UploadPictures() {
    const navigate = useNavigate();

  return (
    <div className="container p-5">
      <div className="border p-3">
        <h4>Renewal Form</h4>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="p-3 border">
                <h4>Renewal Application</h4>

                {/* //TODO: fix the radio button */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="otherName"
                    id="otherName1"
                  />
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="ICEPEPRegion"
                      placeholder="ICEPEP Region"
                    />
                    <label>Other No.</label>
                  </div>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pcpe"
                    id="pcpe"
                  />

                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="ICEPEPRegion"
                      placeholder="ICEPEP Region"
                    />
                    <label>Enter your PCPE No.</label>
                  </div>
                </div>
              </div>

              <div className="form-floating my-3">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="1"
                />
                <label>Amount Paid</label>
              </div>
              <div>
                <div className="mb-3">
                  <label className="form-label">
                    Title of Regional Attended Activities (at least 2 in the
                    last 3 years) with Certificates
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="certificates"
                    multiple
                  />
                  {/* //TODO: Change to tooltip */}
                  <span className="text-secondary" style={{ fontSize: ".7em" }}>
                    Select all files at once
                  </span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Receipt</label>
                  <input className="form-control" type="file" id="receipt" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="idValidity"
                  placeholder="1//12/2023"
                />
                <label>Date of ID validity</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  placeholder="BPI"
                />
                <label>
                  Bank Name, Location, Date and Time of Deposit/ Transfer
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Title of National Attended Activities (at least 1 in the last
                  3 years) with Certificates
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="NationalCertificates"
                  multiple
                />
                {/* //TODO: Change to tooltip */}
                <span className="text-secondary" style={{ fontSize: ".7em" }}>
                  Select all files at once
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label">2x2 Picture</label>
                <input className="form-control" type="file" id="receipt" accept=".png, .jpeg, .jpg" />
              </div>
            </div>
              <div className="text-end mt-3 d-flex justify-content-between">
                <button className="btn border back-btn" onClick={() => navigate("/renewal")}>Back</button>
                <button className="btn border next-btn text-white" onClick={() => navigate("/renewal/consent")}>Next</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
