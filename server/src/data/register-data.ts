import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { prisma } from "../config/prisma";
import { IDType, RegisterForm } from "../types/validation-types";
import {
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../util/http-status-codes";
import { logger } from "../middlewares/logger";

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

      const created_files = await handleCreateFiles(
        renewal_form,
        created_member.response.id,
        prisma
      );

      if (!created_files.success || !created_files.response) {
        return {
          success: false,
          code: created_files.code,
          error: created_files.error,
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

export const handleCreateName = async (
  renewal_form: RegisterForm,
  member_id: IDType,
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
) => {
  try {
    const created_name = await prisma.memberName.create({
      data: {
        memberId: member_id,
        firstName: renewal_form.firstName,
        middleName: renewal_form.middleName,
        lastName: renewal_form.lastName,
      },
    });

    if (!created_name) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error processing name",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: created_name,
    };
  } catch (error) {
    logger.log("error", `${error}`);

    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Create Name Error",
    };
  }
};

export const handleCreateFiles = async (
  renewal_form: RegisterForm,
  member_id: IDType,
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
) => {
  try {
    const regional_cert_names = Array.isArray(renewal_form.regionalCert?.files)
      ? renewal_form.regionalCert.files.map((file) => file.name)
      : [];

    const national_cert_names = Array.isArray(renewal_form.nationalCert?.files)
      ? renewal_form.nationalCert.files.map((file) => file.name)
      : [];

    const created_files = await prisma.memberFiles.create({
      data: {
        memberId: member_id,
        regionalCert: regional_cert_names,
        nationalCert: national_cert_names,
        receipt: renewal_form.receipt.file.name,
        picture: renewal_form.picture.file.name,
        signature: renewal_form.signature.file.name,
      },
    });

    if (!created_files) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error processing files",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: created_files,
    };
  } catch (error) {
    logger.log("error", `${error}`);

    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Create Files Error",
    };
  }
};
