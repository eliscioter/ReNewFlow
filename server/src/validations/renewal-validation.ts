import { RenewForm } from "../types/validation-types";
import {
  BAD_REQUEST_STATUS,
  OK_STATUS,
} from "../util/http-status-codes";
import { RenewalSchema } from "./schema/renewal";
import { fromZodError } from "zod-validation-error";

export const validateRenewalForm = (renewal_form: RenewForm) => {
  const parsed_date_id = new Date(renewal_form.dateIdValidity);
  const parsed_submitted_at = new Date(renewal_form.submittedAt);

  const updated_renewal_form = {
    ...renewal_form,
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