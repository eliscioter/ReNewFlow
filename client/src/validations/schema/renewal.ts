import { z } from "zod";
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  ZIP_CODE_LENGTH,
  MIN_ADDRESS_LENGTH,
  MAX_ADDRESS_LENGTH,
  MIN_BIRTH_PLACE_LENGTH,
  MAX_BIRTH_PLACE_LENGTH,
  MOBILE_NUMBER_LENGTH,
  MIN_TYPE_NO_LENGTH,
  MAX_TYPE_NO_LENGTH,
  MIN_AMOUNT_PAID,
  MAX_AMOUNT_PAID,
  MIN_DATE_ID_VALIDITY,
  formatDateMessage,
  MAX_DATE_ID_VALIDITY,
  MIN_TRANSACTION_DETAILS_LENGTH,
  MAX_TRANSACTION_DETAILS_LENGTH,
  MAX_REGION_LENGTH,
  MIN_SUBMITTED_AT,
  MAX_SUBMITTED_AT,
} from "../../util/validation-constants";
import { BatchNumberSchema } from "./batch";
import { GenderSchema } from "./gender";
import { MemberTypeSchema } from "./member-type";
import { FileSchema, MultipleFileSchema } from "./file";

export const RenewalSchema = z.object({
  lastName: z
    .string()
    .min(MIN_NAME_LENGTH, {
      message: `Last name must be at least ${MIN_NAME_LENGTH} characters long`,
    })
    .max(MAX_NAME_LENGTH, {
      message: `Last name must be at most ${MAX_NAME_LENGTH} characters long`,
    }),
  firstName: z
    .string()
    .min(MIN_NAME_LENGTH, {
      message: `First name must be at least ${MIN_NAME_LENGTH} characters long`,
    })
    .max(MAX_NAME_LENGTH, {
      message: `First name must be at most ${MAX_NAME_LENGTH} characters long`,
    }),
  middleName: z
    .string()
    .min(MIN_NAME_LENGTH, {
      message: `Middle name must be at least ${MIN_NAME_LENGTH} characters long`,
    })
    .max(MAX_NAME_LENGTH, {
      message: `Middle name must be at most ${MAX_NAME_LENGTH} characters long`,
    }),
  zipCode: z.string().regex(new RegExp(`^\\d{${ZIP_CODE_LENGTH}}$`), {
    message: `ZIP code must be exactly ${ZIP_CODE_LENGTH} digits long`,
  }),
  address: z
    .string()
    .min(MIN_ADDRESS_LENGTH, {
      message: `Address must be at least ${MIN_ADDRESS_LENGTH} characters long`,
    })
    .max(MAX_ADDRESS_LENGTH, {
      message: `Address must be at most ${MAX_ADDRESS_LENGTH} characters long`,
    }),
  birthPlace: z
    .string()
    .min(MIN_BIRTH_PLACE_LENGTH, {
      message: `Birth place must be at least ${MIN_BIRTH_PLACE_LENGTH} characters long`,
    })
    .max(MAX_BIRTH_PLACE_LENGTH, {
      message: `Birth place must be at most ${MAX_BIRTH_PLACE_LENGTH} characters long`,
    }),
  mobileNumber: z.string().regex(new RegExp(`^\\d{${MOBILE_NUMBER_LENGTH}}$`), {
    message: `Mobile number must be exactly ${MOBILE_NUMBER_LENGTH} digits long`,
  }),
  email: z.string().email({
    message: `Please enter a valid email address`,
  }),
  gender: GenderSchema,
  type: MemberTypeSchema,
  typeNo: z
    .string()
    .min(MIN_TYPE_NO_LENGTH, {
      message: `Type number must be at least ${MIN_TYPE_NO_LENGTH} characters long`,
    })
    .max(MAX_TYPE_NO_LENGTH, {
      message: `Type number must be at most ${MAX_TYPE_NO_LENGTH} characters long`,
    }),
  amountPaid: z
    .number()
    .min(MIN_AMOUNT_PAID, {
      message: `Amount paid must be at least ${MIN_AMOUNT_PAID}`,
    })
    .max(MAX_AMOUNT_PAID, {
      message: `Amount paid must be at most ${MAX_AMOUNT_PAID}`,
    }),
  dateIdValidity: z
    .date({
      required_error: "Please add date ID validity",
      invalid_type_error: "Date ID validity must be a date",
    })
    .min(MIN_DATE_ID_VALIDITY, {
      message: formatDateMessage(MIN_DATE_ID_VALIDITY, "at least"),
    })
    .max(MAX_DATE_ID_VALIDITY, {
      message: formatDateMessage(MAX_DATE_ID_VALIDITY, "at most"),
    }),
  transactionDetails: z
    .string()
    .min(MIN_TRANSACTION_DETAILS_LENGTH, {
      message: `Transaction details must be at least ${MIN_TRANSACTION_DETAILS_LENGTH} characters long`,
    })
    .max(MAX_TRANSACTION_DETAILS_LENGTH, {
      message: `Transaction details must be at most ${MAX_TRANSACTION_DETAILS_LENGTH} characters long`,
    }),
  region: z
    .string()
    .min(MIN_TRANSACTION_DETAILS_LENGTH, {
      message: `Region must be at least ${MIN_TRANSACTION_DETAILS_LENGTH} characters long`,
    })
    .max(MAX_REGION_LENGTH, {
      message: `Region must be at most ${MAX_REGION_LENGTH} characters long`,
    }),
  batchNo: BatchNumberSchema,
  submittedAt: z
    .date({
      required_error: "Please add submitted at date",
      invalid_type_error: "Submitted at must be a date",
    })
    .min(MIN_SUBMITTED_AT, {
      message: formatDateMessage(MIN_SUBMITTED_AT, "at least"),
    })
    .max(MAX_SUBMITTED_AT, {
      message: formatDateMessage(MAX_SUBMITTED_AT, "at most"),
    }),
  picture: FileSchema,
  receipt: FileSchema,
  signature: FileSchema,
  regionalCert: MultipleFileSchema,
  nationalCert: MultipleFileSchema,
});
