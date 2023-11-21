import { Router } from "express";
import { submitRegistration } from "../controllers/register-controller";

export const registerRouter = Router();

registerRouter.post("/submit", submitRegistration);
