import { z } from "zod";

export const IDSchema = z.string().uuid({message: "Invalid ID."});