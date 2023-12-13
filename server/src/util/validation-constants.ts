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

export const MIN_NAME_LENGTH = 2 as const;
export const MAX_NAME_LENGTH = 50 as const;

export const ZIP_CODE_LENGTH = 4 as const;

export const MIN_ADDRESS_LENGTH = 5 as const;
export const MAX_ADDRESS_LENGTH = 100 as const;

export const MIN_BIRTH_PLACE_LENGTH = 3 as const;
export const MAX_BIRTH_PLACE_LENGTH = 50 as const;

export const MOBILE_NUMBER_LENGTH = 11 as const;

export const MIN_AMOUNT_PAID = 0 as const;
export const MAX_AMOUNT_PAID = 1000000 as const;

// TODO: Change to apt date ID validity

export const MIN_DATE_ID_VALIDITY = Object.freeze(new Date(2021, 0, 1));
export const MAX_DATE_ID_VALIDITY = Object.freeze(new Date(2025, 11, 31));

export const MIN_TRANSACTION_DETAILS_LENGTH = 5 as const;
export const MAX_TRANSACTION_DETAILS_LENGTH = 50 as const;

export const MIN_REGION_LENGTH = 5 as const;
export const MAX_REGION_LENGTH = 50 as const;

export const CURRENT_BATCH_GROUP = 20 as const;

export const CURRENT_BATCH = "Batch 1" as const;

// TODO: Change to apt type number length
export const MIN_TYPE_NO_LENGTH = 1 as const;
export const MAX_TYPE_NO_LENGTH = 10 as const;

// TODO: Change to apt date range
const currentYear = new Date().getFullYear();
export const MIN_SUBMITTED_AT = Object.freeze(new Date(currentYear, 0, 1));
export const MAX_SUBMITTED_AT = Object.freeze(new Date(currentYear, 11, 31));

// TODO: Change to apt file size
// * This is 5 MB
export const MAX_FILE_SIZE = Object.freeze(5 * 1024 * 1024);

export const MIN_FILE_NAME_LENGTH = 2 as const;
export const MAX_FILE_NAME_LENGTH = 155 as const;

export const MIN_FILE_UPLOAD = 1 as const;
export const MAX_FILE_UPLOAD = 5 as const;

export const formatDateMessage = (date: Date, comparison: string) =>
  `Date ID validity must be ${comparison} ${date.toISOString()}`;

export const ActionTaken = Object.freeze({
  REGISTERED: "REGISTERED",
  RENEWED: "RENEWED",
} as const);

export const CURRENT_YEAR = Object.freeze(new Date().getFullYear());
export const CURRENT_MONTH = Object.freeze(new Date().getMonth());
