import { useNavigate } from "react-router";

export default function ConsentRegister() {
  const navigate = useNavigate();
  return (
    <div className="parent-bg vh-100 p-5">
      <div className="container bg-light border rounded-4 p-3">
        <h4>Register Form</h4>
        <div className="container text-center pt-5 px-5 fw-semibold">
          <h5 className="fw-bold">Registration Application Form</h5>
          <p>
            I, certify that the foregoing information and the attached documents
            are true and correct. I am fully aware that
            <br />
            any false or misleading statements on this form or on the
            attachments will be grounds for the disqualification for
            <br />
            Certification Application/Renewal.
          </p>
        </div>
        <div className="container d-flex justify-content-evenly">
          <div className="mb-3">
            <label className="form-label fw-bold">Upload Signature</label>
            <input
              className="RenewForm-Input form-control"
              type="file"
              id="receipt"
              accept=".png, .jpeg, .jpg"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Date</label>
            <input
              className="RenewForm-Input form-control"
              type="date"
              id="date"
            />
          </div>
        </div>
        <div className="text-end mt-3 d-flex justify-content-between">
          <button
            className="btn border back-btn w-25 fw-bold"
            onClick={() => navigate("/register/upload-pictures")}
          >
            Back
          </button>
          <button
            className="btn border next-btn text-white fw-bold w-25"
            onClick={() => navigate("/")}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}