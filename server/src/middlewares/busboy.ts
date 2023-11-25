import { RequestHandler } from "express";
import path from "path";
import { FileData, FileType } from "../types/validation-types";
import Busboy from "busboy";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../util/http-status-codes";
import { FileTypeSchema } from "../validations/schema/file";
import { logger } from "./logger";
import { MAX_FILE_SIZE } from "../util/validation-constants";

const save_path = (fileName: string) => {
  const uploads_path = path.join(__dirname, '..', '..', 'assets', 'uploads');

  if (!fs.existsSync(uploads_path)) {
    fs.mkdirSync(uploads_path, { recursive: true });
  }

  const file_path = path.join(uploads_path, fileName);
  return file_path;
}
export const fileHandling: RequestHandler = (req, res, next) => {
  try {
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    });
    const file_paths: string[] = [];
    const fileData: FileData = {};
    let file_size: number = 0;
    let non_file_fields: { [key: string]: string } = {};

    busboy.on("file", (_, file, info) => {
      const { filename, mimeType } = info;

      const validation = FileTypeSchema.safeParse(mimeType);

      if (!validation.success) {
        res
          .status(BAD_REQUEST_STATUS)
          .json({ message: "Server File Store Error" });
        return;
      }

      const unique_file_name = `${uuidv4()}-${filename}`;

      // TODO: Make sure to delete submitted files if a file exceeded file limit
      file.on("limit", () => {
        res
          .status(BAD_REQUEST_STATUS)
          .json({ message: "File Size Limit Exceeded 5 MB" });

        return;
      });

      file.on("data", (data) => {
        file_size += data.length;
      });

      fileData[unique_file_name] = {
        size: file_size,
        name: unique_file_name,
        type: mimeType as FileType,
      };

      const saveTo = save_path(unique_file_name);
      file.pipe(fs.createWriteStream(saveTo));
      file_paths.push(`/assets/uploads/${unique_file_name}`);
    });

    busboy.on("field", (fieldName, value) => {
      non_file_fields[fieldName] = value;
    });

    busboy.on("close", () => {
      if (file_paths.length === 0) {
        logger.log("error", "No File Uploaded Error");
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .json({ message: "Server File Store Error" });
        return;
      }
      next();
    });

    req.body = { non_file_fields, file_paths };
    req.pipe(busboy);
  } catch (error) {
    logger.log("error", `${error}`);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: "Server Store Files Error" });
  }
};
