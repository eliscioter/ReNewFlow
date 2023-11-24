import asyncHandler from "express-async-handler";
import { handleCreateRenewal } from "../data/renewal-data";
import { logger } from "../middlewares/logger";
import { FileHandlingData, RenewForm } from "../types/validation-types";
import { INTERNAL_SERVER_ERROR_STATUS } from "../util/http-status-codes";
import { validateRenewalForm } from "../validations/renewal-validation";

export const submitRenewal = asyncHandler(async (req, res) => {
  try {
    const renewal_form: FileHandlingData = req.body;

    const updated_renewal_form: RenewForm = {
      ...renewal_form.non_file_fields,
      picture: renewal_form.file_paths[0],
      receipt: renewal_form.file_paths[1],
      signature: renewal_form.file_paths[2],
      regionalCert: renewal_form.file_paths.slice(3, 4),
      nationalCert: renewal_form.file_paths.slice(4, 5),
    };

    console.log(updated_renewal_form, "Q@#@#Q")

    const validate_renewal_form = validateRenewalForm(updated_renewal_form);

    if (!validate_renewal_form.valid || !validate_renewal_form.response) {
      res
        .status(validate_renewal_form.code)
        .json({ message: validate_renewal_form.error });
      return;
    }

    const create_renewal = await handleCreateRenewal(
      validate_renewal_form.response
    );

    if (!create_renewal.success) {
      res.status(create_renewal.code).json({ message: create_renewal.error });
      return;
    }

    res.status(create_renewal.code).json({ message: create_renewal.response });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Submit Renewal Error" });
  }
});
