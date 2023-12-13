import { useParams } from "react-router-dom";
import { useRegisteredPersonData } from "../../../services/api/demographics";

export default function UserRenewalInfo() {
  const { id } = useParams();
  const { data: registered_people } = useRegisteredPersonData(id || "");

  return (
    <div className="bg-light">
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
                placeholder={registered_people?.data.name.firstName || ""}
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
                placeholder={registered_people?.data.name.lastName || ""}
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
                placeholder={registered_people?.data.name.middleName || ""}
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
                placeholder={registered_people?.data.address || ""}
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
                placeholder={registered_people?.data.zipCode || ""}
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
                placeholder={registered_people?.data.mobileNumber || ""}
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
                placeholder={registered_people?.data.gender || ""}
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
                placeholder={registered_people?.data.birthPlace || ""}
              />
            </div>
          </div>
          {/* Renewal Form Details */}
          <div className="row pt-5">
            <legend className="fw-bold">Renewal Form Details</legend>
            <div className="mb-3 border border-secondary"></div>
            <div className="col-2 mb-3 fw-medium">
              <label htmlFor="disabledTextInput" className="form-label">
                Renewal Application Type
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                placeholder={registered_people?.data.type || ""}
              />
            </div>
            <div className="col-3 mb-3 fw-medium">
              <label htmlFor="disabledTextInput" className="form-label">
                {registered_people?.data.type} No.
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                placeholder={registered_people?.data.typeNo || ""}
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
                placeholder={`Php. ${registered_people?.data.amountPaid}` || ""}
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
                placeholder={registered_people?.data.batchNo || ""}
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
                // TODO: Format the date properly
                placeholder={
                  registered_people?.data.dateIdValidity.toString() || ""
                }
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
                placeholder={registered_people?.data.transactionDetails || ""}
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
                placeholder={registered_people?.data.region || ""}
              />
            </div>
          </div>
          {/* Attachments */}
          <div className="row pt-5">
            <legend className="fw-bold">Attachments</legend>
            <div className="mb-3 border border-secondary"></div>
            <div className="col-6 mb-3 fw-medium">
              <label htmlFor="disabledTextInput" className="form-label">
                Title of Regional Attended Activities (at least 2 in the last 3
                years) with Certificates
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                // TODO: Remove the path name. Only show the file name
                placeholder={
                  `${registered_people?.data.regionalCert.regionalCert[0]}`
                }
              />
            </div>
            <div className="col-6 mb-3 fw-medium">
              <label htmlFor="disabledTextInput" className="form-label">
                Title of National Attended Activities (at least 1 in the last 3
                years) with Certificates
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                // TODO: Remove the path name. Only show the file name
                placeholder={
                  `${registered_people?.data.nationalCert.nationalCert[0]}`
                }
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
                // TODO: Remove the path name. Only show the file name
                placeholder={`${registered_people?.data.picture.picture}`}
              />
            </div>
            <div className="col-2 mb-3 fw-medium">
              <label htmlFor="disabledTextInput" className="form-label">
                Receipt
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                // TODO: Remove the path name. Only show the file name
                placeholder={`${registered_people?.data.receipt.receipt}`}
              />
            </div>
            <div className="col-2 mb-3 fw-medium">
              <label htmlFor="disabledTextInput" className="form-label">
                Signature
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                // TODO: Remove the path name. Only show the file name
                placeholder={`${registered_people?.data.signature.signature}`}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
