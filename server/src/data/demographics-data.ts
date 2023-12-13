import { log } from "console";
import { prisma } from "../config/prisma";
import { logger } from "../middlewares/logger";
import {
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../util/http-status-codes";
import { MemberRenewedMonthCount } from "../types/validation-types";
import { CURRENT_MONTH, CURRENT_YEAR } from "../util/validation-constants";

export const handleFetchRegisteredPeople = async () => {
  try {
    const fetched_data = await prisma.member.findMany({
      where: {
        actionTaken: "REGISTERED",
      },
      select: {
        id: true,
        type: true,
        batchNo: true,
        name: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    if (!fetched_data) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error fetching data",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: fetched_data,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Registered People Error",
    };
  }
};
export const handleFetchRenewalPeople = async () => {
  try {
    const fetched_data = await prisma.member.findMany({
      where: {
        actionTaken: "RENEWED",
      },
      select: {
        id: true,
        type: true,
        batchNo: true,
        name: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    if (!fetched_data) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error fetching data",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: fetched_data,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Registered People Error",
    };
  }
};

export const handleFetchSubmittedData = async (id: string) => {
  try {
    const fetched_data = await prisma.member.findUnique({
      where: {
        id: id,
      },
      include: {
        name: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        picture: {
          select: {
            picture: true,
          },
        },
        receipt: {
          select: {
            receipt: true,
          },
        },
        signature: {
          select: {
            signature: true,
          },
        },
        regionalCert: {
          select: {
            regionalCert: true,
          },
        },
        nationalCert: {
          select: {
            nationalCert: true,
          },
        },
      },
    });

    if (!fetched_data) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error fetching data",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: fetched_data,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Submitted Data Error",
    };
  }
};

export const handleFetchGenderDemographics = async () => {
  try {
    const male_count = await prisma.member.count({
      where: {
        gender: {
          equals: "MALE",
        },
      },
    });

    const female_count = await prisma.member.count({
      where: {
        gender: {
          equals: "FEMALE",
        },
      },
    });

    return {
      success: true,
      code: OK_STATUS,
      response: {
        male: male_count,
        female: female_count,
      },
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Gender Error",
    };
  }
};

const countEachMonth = (data: { createdAt: Date }[]) => {
  const months_counts: MemberRenewedMonthCount = {};
  for (const member of data) {
    const month_name = new Date(member.createdAt).toLocaleString("en-US", {
      month: "long",
    });
    months_counts[month_name] = (months_counts[month_name] || 0) + 1;
  }
  return months_counts;
};

export const handleFetchAllRenewalsCount = async () => {
  try {
    const all_renewals_count = await prisma.member.count({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!all_renewals_count) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error fetching all renewed count data",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: all_renewals_count,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Renewals All Count Error",
    };
  }
};
export const handleFetchRenewalsCount = async () => {
  try {
    const renewals_count = await prisma.member.findMany({
      where: {
        actionTaken: "RENEWED",
        createdAt: {
          gte: new Date(`${CURRENT_YEAR}-01-01`),
          lt: new Date(`${CURRENT_YEAR + 1}-01-01`),
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!renewals_count) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error fetching renewed count data",
      };
    }

    const count_each_month = countEachMonth(renewals_count);

    return {
      success: true,
      code: OK_STATUS,
      response: count_each_month,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Renewals Count Error",
    };
  }
};
export const handleFetchRegisterCount = async () => {
  try {
    const register_count = await prisma.member.count({
      where: {
        actionTaken: "REGISTERED",
        createdAt: {
          gte: new Date(CURRENT_YEAR, CURRENT_MONTH, 1),
          lt: new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 1),
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!register_count) {
      return {
        success: false,
        code: INTERNAL_SERVER_ERROR_STATUS,
        error: "Error fetching registered count data",
      };
    }

    return {
      success: true,
      code: OK_STATUS,
      response: register_count,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      success: false,
      code: INTERNAL_SERVER_ERROR_STATUS,
      error: "Server Fetch Registered Count Error",
    };
  }
};
