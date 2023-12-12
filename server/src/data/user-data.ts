import { prisma } from "../config/prisma";
import { logger } from "../middlewares/logger";
import { IDType, UserType } from "../types/validation-types";
import { INTERNAL_SERVER_ERROR_STATUS } from "../util/http-status-codes";
import { hash, genSalt } from "bcrypt";

async function hashPassword(user: Pick<UserType, "password">) {
  return await hash(user.password, await genSalt(12));
}

// TODO: Implement handleLogin properly
// ! This is temporary
export const handleLogin = async (user: UserType) => {
  try {
    const hashed_password = await hashPassword(user);
    const login = await prisma.user.create({
      data: {
        username: user.username,
        password: hashed_password,
      },
      select: {
        id: true,
      },
    });

    if (!login) {
      return {
        code: INTERNAL_SERVER_ERROR_STATUS,
        success: false,
        error: "Internal Server Create Error",
      };
    }

    return {
      code: 200,
      success: true,
      response: login,
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      code: INTERNAL_SERVER_ERROR_STATUS,
      success: false,
      error: "Internal Server Login Error",
    };
  }
};

// TODO: Implement handleLogout properly
// ! This is temporary
export const handleLogout = async (id: IDType) => {
  try {
    const logout = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!logout) {
      return {
        code: INTERNAL_SERVER_ERROR_STATUS,
        success: false,
        error: "Internal Server Delete Error",
      };
    }

    return {
      code: 200,
      success: true,
      response: "Logged Out",
    };
  } catch (error) {
    logger.log("error", `${error}`);
    return {
      code: INTERNAL_SERVER_ERROR_STATUS,
      success: false,
      error: "Internal Server Logout Error",
    };
  }
};
