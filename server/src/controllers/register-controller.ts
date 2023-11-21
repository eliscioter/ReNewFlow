import asyncHandler from "express-async-handler";
import { logger } from "../middlewares/logger";
import { INTERNAL_SERVER_ERROR_STATUS } from "../util/http-status-codes";
import { validateRegisterForm } from "../validations/register-validation";
import { handleCreateRegistration } from "../data/register-data";

export const submitRegistration = asyncHandler(async (req, res) => {
  try {
    const register_form = req.body;

    const validate_register_form = validateRegisterForm(register_form);

    if (!validate_register_form.valid || !validate_register_form.response) {
      res
        .status(validate_register_form.code)
        .json({ message: validate_register_form.error });
      return;
    }

    const create_register = await handleCreateRegistration(
      validate_register_form.response
    );

    if (!create_register.success) {
      res.status(create_register.code).json({ message: create_register.error });
      return;
    }

    res.status(create_register.code).json({ message: "Renewal Submitted" });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Submit Register Error" });
  }
});
