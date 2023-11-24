import asyncHandler from "express-async-handler";
import { handleCreateRegistration } from "../data/register-data";
import { logger } from "../middlewares/logger";
import { INTERNAL_SERVER_ERROR_STATUS } from "../util/http-status-codes";
import { validateRegisterForm } from "../validations/register-validation";
import { FileHandlingData, RegisterForm } from "../types/validation-types";



export const submitRegistration = asyncHandler(async (req, res) => {
  try {
    const register_form: FileHandlingData = req.body;

    const updated_register_form: RegisterForm = {
      ...register_form.non_file_fields,
      picture: register_form.file_paths[0],
      receipt: register_form.file_paths[1],
      signature: register_form.file_paths[2],
      regionalCert: register_form.file_paths.slice(3, 4),
      nationalCert: register_form.file_paths.slice(4, 6),
    };

    const validate_register_form = validateRegisterForm(updated_register_form);

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

    res.status(create_register.code).json({ message: create_register.response });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Submit Register Error" });
  }
});
