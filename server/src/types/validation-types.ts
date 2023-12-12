import { z } from "zod";
import { IDSchema } from "../validations/schema/id";
import { RegisterSchema } from "../validations/schema/register";
import { RenewalSchema } from "../validations/schema/renewal";
import { UserSchema } from "../validations/schema/user";

export type BatchNumber = `Batch ${number}`;

export type IDType = z.infer<typeof IDSchema>;

export type RenewForm = z.infer<typeof RenewalSchema>;
export type RegisterForm = z.infer<typeof RegisterSchema>;

export type FileType = ".png" | ".jpg" | ".jpeg" | ".jfif" | ".pdf";

export type FileData = {
  [key: string]: {
    name: string;
    size: number;
    type: ".png" | ".jpg" | ".jpeg" | ".jfif" | ".pdf";
  };
};

export type FileHandlingData = {
  non_file_fields: Omit<
    RenewForm,
    "picture" | "receipt" | "signature" | "regionalCert" | "nationalCert"
  >;
  file_paths: string[];
};

export type MemberRenewedMonthCount = {
  [month_name in string]: number;
};

export type UserType = z.infer<typeof UserSchema>;
