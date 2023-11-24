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

export const handleCreateRegistration = async (renewal_form: RegisterForm) => {
  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const created_member = await handleCreateMember(renewal_form, prisma);

      if (!created_member.success || !created_member.response) {
        return {
          success: false,
          code: created_member.code,
          error: created_member.error,
        };
      }

      const created_name = await handleCreateName(
        renewal_form,
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
        renewal_form,
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
        renewal_form,
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
        renewal_form,
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
        renewal_form,
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
        renewal_form,
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
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Create Renewal Error",
    };
  }
};
const handleCreateMember = async (
  renewal_form: RegisterForm,
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
) => {
  try {
    const created_form = await prisma.member.create({
      data: {
        address: renewal_form.address,
        birthPlace: renewal_form.birthPlace,
        zipCode: renewal_form.zipCode,
        mobileNumber: renewal_form.mobileNumber,
        gender: renewal_form.gender,
        type: renewal_form.type,
        dateIdValidity: renewal_form.dateIdValidity,
        transactionDetails: renewal_form.transactionDetails,
        region: renewal_form.region,
        batchNo: renewal_form.batchNo,
        amountPaid: renewal_form.amountPaid,
        submittedAt: renewal_form.submittedAt,
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
