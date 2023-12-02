import { useNavigate } from "react-router";
import {
  BatchNumber,
  MemberType,
  RegisterProps,
} from "../../../types/validation-types";

export default function Upload({
  register,
  errors,
  setValue,
  updateData,
  type,
  amountPaid,
  regionalCert,
  receipt,
  dateIdValidity,
  transactionDetails,
  nationalCert,
  picture,
  region,
  batchNo,
}: RegisterProps) {
  const navigate = useNavigate();
  const currentBatchGroup = 20;
  const generateBatchNumber = () => {
    const batchNumbers = [];
    for (let batchNumber = 1; batchNumber <= currentBatchGroup; batchNumber++) {
      batchNumbers.push(`Batch ${batchNumber}`);
    }
    return batchNumbers;
  };

  const handleRegionalCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setValue("regionalCert", Array.from(files));
      updateData({ regionalCert: Array.from(files) });
    }
  };
  const handleNationalCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setValue("nationalCert", Array.from(files));
      updateData({ nationalCert: Array.from(files) });
    }
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("picture", file);
      updateData({ picture: file });
    }
  };

  return (
    <div className="parent-bg vh-100 p-5">
      <div className="container mt-5 bg-light border rounded-4 p-3">
        <h4>Register Form</h4>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="p-3 border border-2 rounded-3">
                <h4>Register Application</h4>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="typeOfMembership"
                    aria-label="Floating label select example"
                    {...register("type")}
                    value={type}
                    onChange={(e) =>
                      updateData({ type: e.target.value as MemberType })
                    }
                  >
                    <option defaultValue="CCPE" disabled>
                      Open this select type of registration
                    </option>
                    <option value="CCPE">CCPE</option>
                    <option value="PCPE">PCPE</option>
                  </select>
                  <label>Type of Registration</label>
                  {errors.type && (
                    <span className="text-danger">{errors.type.message}</span>
                  )}
                </div>
              </div>

              <div className="form-floating my-3 rounded-3">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="1"
                  {...register("amountPaid", { valueAsNumber: true })}
                  value={amountPaid}
                  onChange={(e) =>
                    updateData({ amountPaid: Number(e.target.value) })
                  }
                />
                <label>Amount Paid</label>
                {errors.amountPaid && (
                  <span className="text-danger">
                    {errors.amountPaid.message}
                  </span>
                )}
              </div>
              <div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Title of Regional Attended Activities (at least 2 in the
                    last 3 years) with Certificates
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="certificates"
                    multiple
                    onChange={(e) => handleRegionalCertUpload(e)}
                  />
                  {/* //TODO: Change to tooltip */}
                  <span className="text-secondary" style={{ fontSize: ".7em" }}>
                    Select all files at once
                  </span>
                  {regionalCert && (
                  <div>
                    <h6>Selected Certificates:</h6>
                    <p>{Array.from(regionalCert).map((file) => file.name).join(", ")}</p>
                  </div>
                )}
                  {errors.regionalCert && (
                    <>
                      <br />
                      <span className="text-danger">
                        {errors.regionalCert.message}
                      </span>
                    </>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Receipt</label>
                  <input
                    className="form-control"
                    type="file"
                    id="receipt"
                    {...register("receipt")}
                    onChange={(e) =>
                      updateData({ receipt: e.target.files?.[0] })
                    }
                  />
                  {receipt.name && (
                  <div>
                    <h6>Selected Receipt:</h6>
                    <p>{receipt.name}</p>
                  </div>
                )}
                  {errors.receipt && (
                    <span className="text-danger">
                      {errors.receipt.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3 rounded-3">
                <input
                  type="date"
                  className="form-control"
                  id="idValidity"
                  placeholder="1//12/2023"
                  {...register("dateIdValidity", { valueAsDate: true })}
                  value={dateIdValidity.toISOString().split("T")[0]}
                  onChange={(e) =>
                    updateData({ dateIdValidity: new Date(e.target.value) })
                  }
                />
                <label>Date of ID validity</label>
                {errors.dateIdValidity && (
                  <span className="text-danger">
                    {errors.dateIdValidity.message}
                  </span>
                )}
              </div>
              <div className="form-floating mb-3 rounded-3">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  placeholder="BPI"
                  {...register("transactionDetails")}
                  value={transactionDetails}
                  onChange={(e) =>
                    updateData({ transactionDetails: e.target.value })
                  }
                />
                <label>
                  Bank Name, Location, Date and Time of Deposit/ Transfer
                </label>
                {errors.transactionDetails && (
                  <span className="text-danger">
                    {errors.transactionDetails.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Title of National Attended Activities (at least 1 in the last
                  3 years) with Certificates
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="NationalCertificates"
                  multiple
                  onChange={(e) => handleNationalCertUpload(e)}
                />
                {/* //TODO: Change to tooltip */}
                <span className="text-secondary" style={{ fontSize: ".7em" }}>
                  Select all files at once
                </span>
                {nationalCert && (
                  <div>
                    <h6>Selected Certificates:</h6>
                    <p>{Array.from(nationalCert).map((file) => file.name).join(", ")}</p>
                  </div>
                )}
                {errors.nationalCert && (
                  <>
                    <br />
                    <span className="text-danger">
                      {errors.nationalCert.message}
                    </span>
                  </>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">2x2 Picture</label>
                <input
                  className="form-control"
                  type="file"
                  id="picture"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => handlePictureUpload(e)}
                />
                {picture.name && (
                  <div>
                    <h6>Selected Picture:</h6>
                    <p>{picture.name}</p>
                  </div>
                )}
                {errors.picture && (
                  <span className="text-danger">{errors.picture.message}</span>
                )}
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="ICEPEPRegion"
                  placeholder="ICEPEP Region"
                  {...register("region")}
                  value={region}
                  onChange={(e) => updateData({ region: e.target.value })}
                />
                <label>Member of ICPEP Region</label>
                {errors.region && (
                  <span className="text-danger">{errors.region.message}</span>
                )}
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id="batch"
                  aria-label="Floating label select example"
                  {...register("batchNo")}
                  value={batchNo}
                  onChange={(e) =>
                    updateData({ batchNo: e.target.value as BatchNumber })
                  }
                >
                  <option defaultValue="Batch 1">Open this select batch number</option>
                  {generateBatchNumber().map((batchNumber, index) => (
                    <option key={index} value={batchNumber}>{batchNumber}</option>
                  ))}
                </select>
                <label>Batch No.</label>
                {errors.batchNo && (
                  <span className="text-danger">{errors.batchNo.message}</span>
                )}
              </div>
            </div>
            <div className="text-end mt-3 d-flex justify-content-between">
              <button
                className="btn border back-btn fw-bold w-25"
                onClick={() => navigate("/register")}
              >
                Back
              </button>
              <button
                className="btn border next-btn text-white fw-bold w-25"
                onClick={() => navigate("/register/consent")}
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
