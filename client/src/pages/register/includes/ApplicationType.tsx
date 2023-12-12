import { MemberType, RegisterProps } from "../../../types/validation-types";

export default function RenewalApplicationType({
  type,
  typeNo,
  register,
  errors,
  updateData,
  resetField,
  setValue,
}: Pick<RegisterProps, "register" | "errors" | "updateData" | "resetField" | "setValue"> & {
  type: MemberType;
  typeNo: string;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ typeNo: "" });
    updateData({ typeNo: e.target.value });
  };

  console.log("typeNo", type);
  return (
    <>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          id="ccpe"
          value={type ?? ""}
          checked={type === "CCPE"}
          onChange={(e) => {
            const value = e.target.value = "CCPE"
            setValue("type", "CCPE");
            updateData({ type: value as MemberType });
          }}
        />
        {errors.type && (
          <div className="text-danger">{errors.type.message}</div>
        )}

        {type === "CCPE" && (
          <div className="form-floating rounded-3">
            <input
              type="text"
              className="form-control"
              id="ccpeInput"
              placeholder="ICEPEP Region"
              {...register("typeNo")}
              value={typeNo}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Enter your CCPE No.</label>
            {errors.typeNo && (
              <div className="text-danger">{errors.typeNo.message}</div>
            )}
          </div>
        )}
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="pcpe"
          value={type ?? ""}
          checked={type === "PCPE"}
          onChange={(e) => {
            const value = e.target.value = "PCPE"
            setValue("type", "PCPE");
            updateData({ type: value as MemberType });
            if (resetField) {
              resetField("typeNo", { defaultValue: "" });
            }
          }}
        />
        {errors.type && (
          <div className="text-danger">{errors.type.message}</div>
        )}
        {type === "PCPE" && (
          <div className="form-floating rounded-3">
            <input
              type="text"
              className="form-control"
              id="pcpeInput"
              placeholder="ICEPEP Region"
              {...register("typeNo")}
              value={typeNo}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Enter your PCPE No.</label>
            {errors.typeNo && (
              <div className="text-danger">{errors.typeNo.message}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
