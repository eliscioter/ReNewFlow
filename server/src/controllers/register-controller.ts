import asyncHandler from "express-async-handler";
import {
  handleCreateRegistration,
  handleFetchRegisteredPeople,
  handleFetchSubmittedData,
} from "../data/register-data";
import { logger } from "../middlewares/logger";
import {
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../util/http-status-codes";
import { validateRegisterForm } from "../validations/register-validation";
import {
  FileHandlingData,
  RegisterForm,
  RenewForm,
} from "../types/validation-types";
import { handleCreateRenewal } from "../data/renewal-data";
import { validateRenewalForm } from "../validations/renewal-validation";
import { IDSchema } from "../validations/schema/id";
import { fromZodError } from "zod-validation-error";
import { prisma } from "../config/prisma";

// TODO: Delete submitted files if registration fails
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

    res
      .status(create_register.code)
      .json({ message: create_register.response });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Submit Register Error" });
  }
});

// TODO: Delete submitted files if renewal fails
export const submitRenewal = asyncHandler(async (req, res) => {
  try {
    const renewal_form: FileHandlingData = req.body;

    const updated_renewal_form: RenewForm = {
      ...renewal_form.non_file_fields,
      picture: renewal_form.file_paths[0],
      receipt: renewal_form.file_paths[1],
      signature: renewal_form.file_paths[2],
      // TODO: Fix this to get 1 or 5 files for each field
      regionalCert: renewal_form.file_paths.slice(3, 4),
      nationalCert: renewal_form.file_paths.slice(4, 5),
    };

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

export const fetchRegisteredPeople = asyncHandler(async (_, res) => {
  try {
    const fetched_data = await handleFetchRegisteredPeople();

    const response = fetched_data.success
    ? fetched_data.response
    : fetched_data.error;
      
    res.status(fetched_data.code).json({ response });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Fetch Registered People Error" });
  }
});

export const fetchSubmittedData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const validate_id = IDSchema.safeParse(id);

    if (!validate_id.success) {
      res
        .status(BAD_REQUEST_STATUS)
        .json({ message: fromZodError(validate_id.error) });
      return;
    }

    const fetch_data = await handleFetchSubmittedData(validate_id.data);

    if (!fetch_data.success) {
      res.status(fetch_data.code).json({ message: fetch_data.error });
      return;
    }

    res.status(fetch_data.code).json({ data: fetch_data.response });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Fetch Submitted Data Error" });
  }
});
