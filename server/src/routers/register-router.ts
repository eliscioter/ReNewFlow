import { Router } from "express";
import { submitRegistration, submitRenewal } from "../controllers/register-controller";
import { fileHandling } from "../middlewares/busboy";

export const registerRouter = Router();

registerRouter.post("/submit",fileHandling, submitRegistration);
registerRouter.post("/submit-renewal", fileHandling, submitRenewal);

