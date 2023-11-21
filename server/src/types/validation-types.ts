import { z } from "zod";
import { RenewalSchema } from "../validations/schema/renewal";
import { RegisterSchema } from "../validations/schema/register";
import { IDSchema } from "../validations/schema/id";

export type BatchNumber = `Batch ${number}`;

export type IDType = z.infer<typeof IDSchema>;

export type RenewForm = z.infer<typeof RenewalSchema>;
export type RegisterForm = z.infer<typeof RegisterSchema>;
