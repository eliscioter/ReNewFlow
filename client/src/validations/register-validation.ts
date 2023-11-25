import { fromZodError } from "zod-validation-error";
import { RegisterForm } from "../types/validation-types";
import { BAD_REQUEST_STATUS, OK_STATUS } from "../util/http-status-codes";
import { RegisterSchema } from "./schema/register";


export const validateRegisterForm = (renewal_form: RegisterForm) => {
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

  const validated_renewal_form = RegisterSchema.safeParse(updated_renewal_form);

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
