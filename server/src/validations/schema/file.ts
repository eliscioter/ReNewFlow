import { z } from "zod";
import {
  FILE_TYPE,
  MAX_FILE_NAME_LENGTH,
  MAX_FILE_SIZE,
  MAX_FILE_UPLOAD,
  MIN_FILE_NAME_LENGTH,
  MIN_FILE_UPLOAD,
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

export const PictureSchema = z.object({
  file: z.object({
    name: z
      .string()
      .min(MIN_FILE_NAME_LENGTH, {
        message: `File name must be at least ${MIN_FILE_NAME_LENGTH} characters long`,
      })
      .max(MAX_FILE_NAME_LENGTH, {
        message: `File name must be at most ${MAX_FILE_NAME_LENGTH} characters long`,
      }),
    size: z.number().max(MAX_FILE_SIZE, {
      message: `File size must be at most ${MAX_FILE_SIZE} MB`,
    }),
    type: PictureTypeSchema,
  }),
});

export const FileSchema = z.object({
  file: z.object({
    name: z
      .string()
      .min(MIN_FILE_NAME_LENGTH, {
        message: `File name must be at least ${MIN_FILE_NAME_LENGTH} characters long`,
      })
      .max(MAX_FILE_NAME_LENGTH, {
        message: `File name must be at most ${MAX_FILE_NAME_LENGTH} characters long`,
      }),
    size: z.number().max(MAX_FILE_SIZE, {
      message: `File size must be at most ${MAX_FILE_SIZE} MB`,
    }),
    type: FileTypeSchema,
  }),
});

export const MultipleFileSchema = z.object({
  files: z
    .array(
      z.object({
        name: z
          .string()
          .min(MIN_FILE_NAME_LENGTH, {
            message: `File name must be at least ${MIN_FILE_NAME_LENGTH} characters long`,
          })
          .max(MAX_FILE_NAME_LENGTH, {
            message: `File name must be at most ${MAX_FILE_NAME_LENGTH} characters long`,
          }),
        size: z.number().max(MAX_FILE_SIZE, {
          message: `File size must be at most ${MAX_FILE_SIZE} MB`,
        }),
        type: FileTypeSchema,
      })
    )
    .min(MIN_FILE_UPLOAD, {
      message: "You must upload at least 1 file.",
    })
    .max(MAX_FILE_UPLOAD, {
      message: "You can upload at most 5 files.",
    }),
});
