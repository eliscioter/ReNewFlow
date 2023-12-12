import asyncHandler from "express-async-handler";
import { BAD_REQUEST_STATUS } from "../util/http-status-codes";
import {
  validateIdInput,
  validateLoginInput,
} from "../validations/user-validation";
import { handleLogin, handleLogout } from "../data/user-data";
export const loginUser = asyncHandler(async (req, res) => {
  const validate_input = validateLoginInput(req.body);

  if (!validate_input.valid || !validate_input.response) {
    res.status(BAD_REQUEST_STATUS).json({ message: validate_input.error });
    return;
  }

  const { code, success, error, response } = await handleLogin(
    validate_input.response
  );

  if (!success) {
    res.status(code).json({ message: error });
    return;
  }
  res.status(code).json(response);
});

export const logoutUser = asyncHandler(async (req, res) => {
  const validate_input = validateIdInput(req.params.id);

  if (!validate_input.valid || !validate_input.response) {
    res.status(BAD_REQUEST_STATUS).json({ message: validate_input.error });
    return;
  }

  const { code, success, error, response } = await handleLogout(
    validate_input.response
  );

  if (!success) {
    res.status(code).json({ message: error });
    return;
  }
  res.status(code).json(response);
});
