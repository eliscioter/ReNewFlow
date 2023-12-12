import { z } from "zod";

export const UserSchema = z.object({
    username: z.string().min(3).max(55),
    // TODO: Add regex for password
    password: z.string().min(8).max(255),
  });