export const GENDERS = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const);

export const MEMBER_TYPE = Object.freeze({
  CCPE: "CCPE",
  PCPE: "PCPE",
} as const);

export const FILE_TYPE = Object.freeze({
  PNG: "image/png",
  JPG: "image/jpg",
  JPEG: "image/jpeg",
  JFIF: "image/jfif",
  PDF: "application/pdf",
} as const);

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const ZIP_CODE_LENGTH = 4;

export const MIN_ADDRESS_LENGTH = 5;
export const MAX_ADDRESS_LENGTH = 100;

export const MIN_BIRTH_PLACE_LENGTH = 3;
export const MAX_BIRTH_PLACE_LENGTH = 50;

export const MOBILE_NUMBER_LENGTH = 11;

export const MIN_AMOUNT_PAID = 0;
export const MAX_AMOUNT_PAID = 1000000;

// TODO: Change to apt date ID validity
export const MIN_DATE_ID_VALIDITY = new Date(2021, 0, 1);
export const MAX_DATE_ID_VALIDITY = new Date(2025, 11, 31);

export const MIN_TRANSACTION_DETAILS_LENGTH = 5;
export const MAX_TRANSACTION_DETAILS_LENGTH = 50;

export const MIN_REGION_LENGTH = 5;
export const MAX_REGION_LENGTH = 50;

export const CURRENT_BATCH_GROUP = 20;

// TODO: Change to apt type number length
export const MIN_TYPE_NO_LENGTH = 1;
export const MAX_TYPE_NO_LENGTH = 10;

// TODO: Change to apt date range
const currentYear = new Date().getFullYear();
export const MIN_SUBMITTED_AT = new Date(currentYear, 0, 1);
export const MAX_SUBMITTED_AT = new Date(currentYear, 11, 31);

// TODO: Change to apt file size
// * This is 5 MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MIN_FILE_NAME_LENGTH = 2;
export const MAX_FILE_NAME_LENGTH = 155;

export const MIN_FILE_UPLOAD = 1;
export const MAX_FILE_UPLOAD = 5;

export const formatDateMessage = (date: Date, comparison: string) =>
  `Date ID validity must be ${comparison} ${date.toISOString()}`;
