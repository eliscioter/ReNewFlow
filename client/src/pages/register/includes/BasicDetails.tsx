import {
  Gender,
  RegisterProps,
} from "../../../types/validation-types";
export default function BasicDetails({
  register,
  errors,
  updateData,
  lastName,
  middleName,
  firstName,
  zipCode,
  mobileNumber,
  address,
  birthPlace,
  gender,
}: RegisterProps) {
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
                  {...register("lastName")}
                  value={lastName}
                  onChange={(e) => updateData({ lastName: e.target.value })}
                />
                <label>Last Name</label>
                {errors.lastName && (
                  <span className="text-danger">{errors.lastName.message}</span>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  placeholder="Santos"
                  {...register("middleName")}
                  value={middleName}
                  onChange={(e) => updateData({ middleName: e.target.value })}
                />
                <label>Middle Name</label>
                {errors.middleName && (
                  <span className="text-danger">
                    {errors.middleName.message}
                  </span>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="zipCode"
                  placeholder="1106"
                  {...register("zipCode")}
                  value={zipCode}
                  onChange={(e) => updateData({ zipCode: e.target.value })}
                />
                <label>Zip Code</label>
                {errors.zipCode && (
                  <span className="text-danger">{errors.zipCode.message}</span>
                )}
              </div>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="09123456789"
                  {...register("mobileNumber")}
                  value={mobileNumber}
                  onChange={(e) => updateData({ mobileNumber: e.target.value })}
                />
                <label>Philippine Cell Phone Number</label>
                {errors.mobileNumber && (
                  <span className="text-danger">
                    {errors.mobileNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="juan"
                  {...register("firstName")}
                  value={firstName}
                  onChange={(e) => updateData({ firstName: e.target.value })}
                />
                <label>First Name</label>
                {errors.firstName && (
                  <span className="text-danger">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="your address"
                  {...register("address")}
                  value={address}
                  onChange={(e) => updateData({ address: e.target.value })}
                />
                <label>Philippine Permanent Mailing Address</label>
                {errors.address && (
                  <span className="text-danger">{errors.address.message}</span>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="birthPlace"
                  placeholder="Manila City"
                  {...register("birthPlace")}
                  value={birthPlace}
                  onChange={(e) => updateData({ birthPlace: e.target.value })}
                />
                <label>Place of Birth</label>
                {errors.birthPlace && (
                  <span className="text-danger">
                    {errors.birthPlace.message}
                  </span>
                )}
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id="gender"
                  aria-label="Floating label select example"
                  {...register("gender")}
                  value={gender}
                  onChange={(e) =>
                    updateData({ gender: e.target.value as Gender })
                  }
                >
                  <option defaultValue="MALE" disabled>
                    Open this select gender
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <label>Gender</label>
                {errors.gender && (
                  <span className="text-danger">{errors.gender.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-start mt-3">
              <button
                className="btn border back-btn fw-bold w-25"
               
              >
                Back
              </button>
            </div>
            <div className="col text-end mt-3">
              <button
                className="btn border next-btn text-white fw-bold w-25"
               
                type="submit"
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
