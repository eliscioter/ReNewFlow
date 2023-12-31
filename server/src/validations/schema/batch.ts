import { z } from "zod";
import { BatchNumber } from "../../types/validation-types";
import { CURRENT_BATCH_GROUP } from "../../util/validation-constants";


export const BatchNumberSchema = z.enum(
  Array.from(
    { length: CURRENT_BATCH_GROUP },
    (_, i) => `Batch ${i + 1}`
  ) as unknown as [BatchNumber, ...BatchNumber[]]
);
