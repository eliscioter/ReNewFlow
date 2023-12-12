import { z } from "zod";
import { MEMBER_TYPE } from "../../util/validation-constants";

export const MemberTypeSchema = z
  .enum([MEMBER_TYPE.CCPE, MEMBER_TYPE.PCPE]).nullable()
  .refine(
    (data) => {
      if (data === null) return true;
      return Object.values(MEMBER_TYPE).includes(data);
    },
    {
      message: `Invalid gender. Please provide either '${MEMBER_TYPE.CCPE}' or '${MEMBER_TYPE.PCPE}'.`,
    }
  );
