import asyncHandler from "express-async-handler";
import { fromZodError } from "zod-validation-error";
import { logger } from "../middlewares/logger";
import {
  INTERNAL_SERVER_ERROR_STATUS,
  BAD_REQUEST_STATUS,
  OK_STATUS,
} from "../util/http-status-codes";
import { IDSchema } from "../validations/schema/id";
import {
  handleFetchAllRenewalsCount,
  handleFetchGenderDemographics,
  handleFetchRegisterCount,
  handleFetchRegisteredPeople,
  handleFetchRenewalPeople,
  handleFetchRenewalsCount,
  handleFetchSubmittedData,
} from "../data/demographics-data";

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
export const fetchRenewalPeople = asyncHandler(async (_, res) => {
  try {
    const fetched_data = await handleFetchRenewalPeople();

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

export const fetchGenderDemographics = asyncHandler(async (_, res) => {
  try {
    const gender_count = await handleFetchGenderDemographics();

    if (!gender_count.success) {
      res.status(gender_count.code).json(gender_count.response);
      return;
    }

    res.status(OK_STATUS).json({
      data: gender_count.response,
    });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server fetch gender demographics error" });
  }
});

export const fetchAllRenewalsCount = asyncHandler(async (_, res) => {
  try {
    const all_renewed_count = await handleFetchAllRenewalsCount();

    if (!all_renewed_count.success) {
      res.status(all_renewed_count.code).json(all_renewed_count.response);
      return;
    }

    res.status(OK_STATUS).json({
      data: all_renewed_count.response,
    });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server fetch all renewals count error" });
  }
});
export const fetchRenewalsCount = asyncHandler(async (_, res) => {
  try {
    const renewed_count = await handleFetchRenewalsCount();

    if (!renewed_count.success) {
      res.status(renewed_count.code).json(renewed_count.response);
      return;
    }

    res.status(OK_STATUS).json({
      data: renewed_count.response,
    });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server fetch renewals count error" });
  }
});
export const fetchRegisteredCount = asyncHandler(async (_, res) => {
  try {
    const registered_count = await handleFetchRegisterCount();

    if (!registered_count.success) {
      res.status(registered_count.code).json(registered_count.response);
      return;
    }

    res.status(OK_STATUS).json({
      data: registered_count.response,
    });
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server fetch registered count error" });
  }
});
