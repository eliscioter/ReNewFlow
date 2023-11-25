import { z } from "zod";
import { MEMBER_TYPE } from "../../util/validation-constants";

export const MemberTypeSchema = z
  .enum([MEMBER_TYPE.CCPE, MEMBER_TYPE.PCPE])
  .refine(
    (data) => {
      return Object.values(MEMBER_TYPE).includes(data);
    },
    {
      message: `Invalid gender. Please provide either '${MEMBER_TYPE.CCPE}' or '${MEMBER_TYPE.PCPE}'.`,
    }
  );
