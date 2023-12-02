import { z } from "zod";
import {
  FILE_TYPE,
  MIN_FILE_UPLOAD,
  MAX_FILE_UPLOAD,
  MAX_FILE_SIZE,
  MAX_FILE_NAME_LENGTH,
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

  export const FileSchema = z.custom<File>((file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        reject(new Error('Invalid file type'));
      } else {
        if (file.size > MAX_FILE_SIZE) {
          reject(new Error('File size must be less than 5MB'));
        } else if (file.name.length > MAX_FILE_NAME_LENGTH) {
          reject(new Error('File name is too long'));
        } else {
          resolve(file);
        }
      }
    });
  });

export const MultipleFileSchema = z
  .array(z.instanceof(File))
  .min(MIN_FILE_UPLOAD, {
    message: "You must upload at least 1 file.",
  })
  .max(MAX_FILE_UPLOAD, {
    message: "You can upload at most 5 files.",
  })
  .refine(
    (files) => files.every((file) => file.size < MAX_FILE_SIZE),
    "File size must be less than 5MB"
  );
