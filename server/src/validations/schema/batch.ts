import { z } from "zod";
import { CURRENT_BATCH_GROUP } from "../../util/validation-constants";
import { BatchNumber } from "../../types/validation-types";

export const BatchNumberSchema = z.enum(
  Array.from(
    { length: CURRENT_BATCH_GROUP },
    (_, i) => `Batch ${i + 1}`
  ) as unknown as [BatchNumber, ...BatchNumber[]]
);
