import { z } from "zod";
import { IDSchema } from "../validations/schema/id";
import { RegisterSchema } from "../validations/schema/register";
import { RenewalSchema } from "../validations/schema/renewal";
import { MemberTypeSchema } from "../validations/schema/member-type";

export type BatchNumber = `Batch ${number}`;

export type IDType = z.infer<typeof IDSchema>;

export type RenewForm = z.infer<typeof RenewalSchema>;

export type RegisterForm = z.infer<typeof RegisterSchema>;

export type PersonRegistration = z.infer<typeof MemberTypeSchema>;

export type RegisteredPeople = {
  response: {
    id: IDType;
    name: Pick<RegisterForm, "lastName" | "firstName">;
    type: PersonRegistration;
    batchNo: BatchNumber;
  }[];
};
export type OtherDetails = {
  name: Pick<RegisterForm, "lastName" | "firstName" | "middleName">;
  picture: Pick<RegisterForm, "picture">;
  signature: Pick<RegisterForm, "signature">;
  receipt: Pick<RegisterForm, "receipt">;
  regionalCert:Pick<RegisterForm, "regionalCert">;
  nationalCert:  Pick<RegisterForm, "nationalCert">;

}
export type RegisteredPerson = {
  data: RenewForm & OtherDetails;
};

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
