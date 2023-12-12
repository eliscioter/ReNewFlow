import { RegisterProps } from "../../../types/validation-types";

export default function ConsentRegister({
  pathname,
  register,
  errors,
  setValue,
  updateData,
  signature,
  dateIdValidity,
}: RegisterProps) {

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("signature", file);
      updateData({ signature: file });
    }
  };

  return (
    <>
      <div className="container text-center pt-5 px-5 fw-semibold">
        <h5 className="fw-bold">
          {pathname === "/renewal"
            ? "Renewal Application Form"
            : "Register Application Form"}
        </h5>
        <p>
          I, certify that the foregoing information and the attached documents
          are true and correct. I am fully aware that
          <br />
          any false or misleading statements on this form or on the attachments
          will be grounds for the disqualification for
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
            onChange={(e) => handleSignatureUpload(e)}
          />
          {signature.name && (
            <div>
              <h6>Selected Signature:</h6>
              <p>{signature.name}</p>
            </div>
          )}
          {errors.signature && (
            <span className="text-danger">{errors.signature.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Date</label>
          <input
            className="RenewForm-Input form-control"
            type="date"
            id="date"
            {...register("submittedAt", { valueAsDate: true })}
            value={dateIdValidity.toISOString().split("T")[0]}
            onChange={(e) =>
              updateData({ dateIdValidity: new Date(e.target.value) })
            }
          />
          {errors.submittedAt && (
            <span className="text-danger">{errors.submittedAt.message}</span>
          )}
        </div>
      </div>
    </>
  );
}
