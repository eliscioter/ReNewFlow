import { z } from "zod";
import {
  FILE_TYPE,
  MIN_FILE_NAME_LENGTH,
  MAX_FILE_NAME_LENGTH,
  MIN_FILE_UPLOAD,
  MAX_FILE_UPLOAD,
} from "../../util/validation-constants";

export const PictureTypeSchema = z
  .enum([FILE_TYPE.PNG, FILE_TYPE.JPG, FILE_TYPE.JPEG, FILE_TYPE.JFIF])
  .refine(
    (data) => {
      return (Object.values(FILE_TYPE) as string[]).includes(data as string);
    },
    {
      message: `Invalid file type. Please provide either '${FILE_TYPE.PNG}', '${FILE_TYPE.JPG}', ${FILE_TYPE.JPEG}, or ${FILE_TYPE.JFIF} .`,
    }
  );
export const FileTypeSchema = z
  .enum([
    FILE_TYPE.PDF,
    FILE_TYPE.PNG,
    FILE_TYPE.JPG,
    FILE_TYPE.JPEG,
    FILE_TYPE.JFIF,
  ])
  .refine(
    (data) => {
      return (Object.values(FILE_TYPE) as string[]).includes(data as string);
    },
    {
      message: `Invalid file type. Please provide either '${FILE_TYPE.PNG}', '${FILE_TYPE.PNG}', '${FILE_TYPE.JPG}', ${FILE_TYPE.JPEG}, or ${FILE_TYPE.JFIF} .`,
    }
  );

export const PictureSchema = z
  .string()
  .min(MIN_FILE_NAME_LENGTH, {
    message: `File name must be at least ${MIN_FILE_NAME_LENGTH} characters long`,
  })
  .max(MAX_FILE_NAME_LENGTH, {
    message: `File name must be at most ${MAX_FILE_NAME_LENGTH} characters long`,
  });

export const FileSchema = z.string().min(MIN_FILE_NAME_LENGTH, {
  message: `File name must be at least ${MIN_FILE_NAME_LENGTH} characters long`,
});

export const MultipleFileSchema = z
  .array(
    z
      .string()
      .min(MIN_FILE_NAME_LENGTH, {
        message: `File name must be at least ${MIN_FILE_NAME_LENGTH} characters long`,
      })
      .max(MAX_FILE_NAME_LENGTH, {
        message: `File name must be at most ${MAX_FILE_NAME_LENGTH} characters long`,
      })
  )
  .min(MIN_FILE_UPLOAD, {
    message: "You must upload at least 1 file.",
  })
  .max(MAX_FILE_UPLOAD, {
    message: "You can upload at most 5 files.",
  });
