import { fromZodError } from "zod-validation-error";
import { RenewForm } from "../types/validation-types";
import { BAD_REQUEST_STATUS, OK_STATUS } from "../util/http-status-codes";
import { RenewalSchema } from "./schema/renewal";

export const validateRenewalForm = (renewal_form: RenewForm) => {
  if (!renewal_form.dateIdValidity || !renewal_form.submittedAt) {
    return {
      valid: false,
      code: BAD_REQUEST_STATUS,
      error: "Invalid Date ID Validity or Submitted At Date",
    };
  }
  const parsed_date_id = new Date(renewal_form.dateIdValidity);
  const parsed_submitted_at = new Date(renewal_form.submittedAt);
  const parsed_amount_paid = Number(renewal_form.amountPaid)

  const updated_renewal_form = {
    ...renewal_form,
    amountPaid: parsed_amount_paid,
    dateIdValidity: parsed_date_id,
    submittedAt: parsed_submitted_at,
  };

  const validated_renewal_form = RenewalSchema.safeParse(updated_renewal_form);

  if (!validated_renewal_form.success) {
    return {
      valid: false,
      code: BAD_REQUEST_STATUS,
      error: fromZodError(validated_renewal_form.error),
    };
  }

  return {
    valid: true,
    code: OK_STATUS,
    response: validated_renewal_form.data,
  };
};
