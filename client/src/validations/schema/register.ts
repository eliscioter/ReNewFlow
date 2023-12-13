import { RenewalSchema } from "./renewal";

export const RegisterSchema = RenewalSchema.omit({ typeNo: true, batchNo: true });
