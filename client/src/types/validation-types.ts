import { z } from "zod";
import { IDSchema } from "../validations/schema/id";
import { RegisterSchema } from "../validations/schema/register";
import { RenewalSchema } from "../validations/schema/renewal";
import { MemberTypeSchema } from "../validations/schema/member-type";
import {
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { GenderSchema } from "../validations/schema/gender";
import { UserSchema } from "../validations/schema/user";

export type BatchNumber = `Batch ${number}`;

export type IDType = z.infer<typeof IDSchema>;

export type RenewForm = z.infer<typeof RenewalSchema>;

export type RegisterForm = z.infer<typeof RegisterSchema>;

export type PersonRegistration = z.infer<typeof MemberTypeSchema>;

export type Gender = z.infer<typeof GenderSchema>;

export type MemberType = z.infer<typeof MemberTypeSchema>;

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
  regionalCert: Pick<RegisterForm, "regionalCert">;
  nationalCert: Pick<RegisterForm, "nationalCert">;
};
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

export type RegisterProps = RegisterForm &
  Partial<{ typeNo: string; batchNo: BatchNumber }> & {
    register: UseFormRegister<
      RegisterForm & Partial<{ typeNo: string; batchNo: BatchNumber }>
    >;
    errors: FieldErrors<
      RegisterForm & Partial<{ typeNo: string; batchNo: BatchNumber }>
    >;
    setValue: UseFormSetValue<
      RegisterForm & Partial<{ typeNo: string; batchNo: BatchNumber }>
    >;
    updateData: (
      data: Partial<
        RegisterForm & Partial<{ typeNo: string; batchNo: BatchNumber }>
      >
    ) => void;
    resetField?: UseFormResetField<
      RegisterForm & Partial<{ typeNo: string; batchNo: BatchNumber }>
    >;
    pathname?: string;
  };

export interface CustomFile extends File {
  file: File | null;
  name: string;
  size: number;
  type: string;
}

export type GenderDemographics = {
  data: {
    male: number;
    female: number;
  };
};

export type RenewedDemographics = Partial<{
  data: {
    January: number;
    February: number;
    March: number;
    April: number;
    May: number;
    June: number;
    July: number;
    August: number;
    September: number;
    October: number;
    November: number;
    December: number;
  };
}>;

export type UserType = z.infer<typeof UserSchema>;
