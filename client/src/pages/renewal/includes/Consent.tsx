import { useNavigate } from "react-router";

export default function Consent() {
    const navigate = useNavigate();
  return (
    <div className="container p-5">
      <div className="border p-3">
        <h4>Renewal Form</h4>
        <div className="container text-center pt-5 px-5">
            <h5>Renewal Application Form</h5>
            <p>
                I, certify that the foregoing information and the attached documents are true and correct. I am fully aware that<br/>
                any false or misleading statements on this form or on the attachments will be grounds for the disqualification for<br/>
                Certification Application/Renewal.
            </p>
        </div>
        <div className="container d-flex justify-content-evenly">
          <div className="mb-3">
            <label className="form-label">Upload Signature</label>
            <input
              className="form-control"
              type="file"
              id="receipt"
              accept=".png, .jpeg, .jpg"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input className="form-control" type="date" id="date" />
          </div>
        </div>
          <div className="text-end mt-3 d-flex justify-content-between">
            <button className="btn border back-btn" onClick={() => navigate("/renewal/upload-pictures")}>Back</button>
            <button className="btn border next-btn text-white" onClick={() => navigate("/")}>Submit</button>
          </div>
      </div>
    </div>
  );
}
