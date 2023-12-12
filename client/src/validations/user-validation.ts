import { IDType, UserType } from "../types/validation-types";
import { BAD_REQUEST_STATUS, OK_STATUS } from "../util/http-status-codes";
import { IDSchema } from "./schema/id";
import { UserSchema } from "./schema/user";

export const validateLoginInput = (user: UserType) => {
  const validate = UserSchema.safeParse(user);

  if (!validate.success) {
    return { valid: false, code: BAD_REQUEST_STATUS, error: validate.error };
  }

  return { valid: true, code: OK_STATUS, response: validate.data };
};

export const validateIdInput = (id: IDType) => {
  const validate = IDSchema.safeParse(id);

  if (!validate.success) {
    return { valid: false, code: BAD_REQUEST_STATUS, error: validate.error };
  }

  return { valid: true, code: OK_STATUS, response: validate.data };
};
