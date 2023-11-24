import { Router } from "express";
import { submitRenewal } from "../controllers/renewal-controller";
import { fileHandling } from "../middlewares/busboy";

export const renewalRouter = Router();

renewalRouter.post("/submit", fileHandling, submitRenewal);
