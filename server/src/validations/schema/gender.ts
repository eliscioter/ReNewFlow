import { z } from "zod";
import { GENDERS } from "../../util/validation-constants";

export const GenderSchema = z.enum([GENDERS.MALE, GENDERS.FEMALE]).refine(
  (data) => {
    return Object.values(GENDERS).includes(data);
  },
  {
    message: `Invalid gender. Please provide either '${GENDERS.MALE}' or '${GENDERS.FEMALE}'.`,
  }
);
