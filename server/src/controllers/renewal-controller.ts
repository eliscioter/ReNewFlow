import asyncHandler from "express-async-handler";
import { logger } from "../middlewares/logger";
import { INTERNAL_SERVER_ERROR_STATUS } from "../util/http-status-codes";
import { validateRenewalForm } from "../validations/renewal-validation";
import { handleCreateRenewal } from "../data/renewal-data";

export const submitRenewal = asyncHandler(async (req, res) => {
  try {
    const renewal_form = req.body;

    const validate_renewal_form = validateRenewalForm(renewal_form);

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

    res.status(create_renewal.code).json({ message: "Renewal Submitted" });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Submit Renewal Error" });
  }
});
