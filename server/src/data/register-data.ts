import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "../config/prisma";
import { logger } from "../middlewares/logger";
import { RegisterForm } from "../types/validation-types";
import {
  OK_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../util/http-status-codes";
import {
  handleCreateName,
  handleCreateReceipt,
  handleCreatePicture,
  handleCreateSignature,
  handleCreateRegionalCert,
  handleCreateNationalCert,
} from "./renewal-data";
import { generateTypeNo } from "../helpers/generate-id";
import { ActionTaken, CURRENT_BATCH } from "../util/validation-constants";

export const handleCreateRegistration = async (register_form: RegisterForm) => {
  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const created_member = await handleCreateRegisterMember(
        register_form,
        prisma
      );

      if (!created_member.success || !created_member.response) {
        return {
          success: false,
          code: created_member.code,
          error: created_member.error,
        };
      }

      const created_name = await handleCreateName(
        register_form,
        created_member.response.id,
        prisma
      );

      if (!created_name.success || !created_name.response) {
        return {
          success: false,
          code: created_name.code,
          error: created_name.error,
        };
      }

      const created_receipt = await handleCreateReceipt(
        register_form,
        created_member.response.id,
        prisma
      );

      if (!created_receipt.success || !created_receipt.response) {
        return {
          success: false,
          code: created_receipt.code,
          error: created_receipt.error,
        };
      }
      const created_picture = await handleCreatePicture(
        register_form,
        created_member.response.id,
        prisma
      );

      if (!created_picture.success || !created_picture.response) {
        return {
          success: false,
          code: created_picture.code,
          error: created_picture.error,
        };
      }
      const created_signature = await handleCreateSignature(
        register_form,
        created_member.response.id,
        prisma
      );

      if (!created_signature.success || !created_signature.response) {
        return {
          success: false,
          code: created_signature.code,
          error: created_signature.error,
        };
      }
      const created_regional_cert = await handleCreateRegionalCert(
        register_form,
        created_member.response.id,
        prisma
      );

      if (!created_regional_cert.success || !created_regional_cert.response) {
        return {
          success: false,
          code: created_regional_cert.code,
          error: created_regional_cert.error,
        };
      }
      const created_national_cert = await handleCreateNationalCert(
        register_form,
        created_member.response.id,
        prisma
      );

      if (!created_national_cert.success || !created_national_cert.response) {
        return {
          success: false,
          code: created_national_cert.code,
          error: created_national_cert.error,
        };
      }

      return {
        success: true,
        code: OK_STATUS,
        response: "Submitted Successfully",
      };
    });

    if (!transaction.success) {
      await prisma.$queryRaw`ROLLBACK`;
      return {
        success: false,
        code: transaction.code,
        error: transaction.error,
      };
    }

    return {
      success: true,
      code: transaction.code,
      response: transaction.response,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    // TODO: Catch PrismaClientKnownRequestError: Transaction API error: Unable to start a transaction in the given time.
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Create Renewal Error",
    };
  }
};
const handleCreateRegisterMember = async (
  register_form: RegisterForm,
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
) => {
  try {
    const created_form = await prisma.member.create({
      data: {
        address: register_form.address,
        birthPlace: register_form.birthPlace,
        zipCode: register_form.zipCode,
        mobileNumber: register_form.mobileNumber,
        email: register_form.email,
        gender: register_form.gender,
        type: register_form.type,
        typeNo: generateTypeNo(),
        dateIdValidity: register_form.dateIdValidity,
        transactionDetails: register_form.transactionDetails,
        region: register_form.region,
        batchNo: CURRENT_BATCH,
        amountPaid: register_form.amountPaid,
        submittedAt: register_form.submittedAt,
        actionTaken: ActionTaken.REGISTERED,
      },
    });
    
    if (!created_form) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error processing form",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: created_form,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Process form Error",
    };
  }
};
