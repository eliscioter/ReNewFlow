import { Router } from "express";
import { submitRenewal } from "../controllers/renewal-controller";

export const renewalRouter = Router();

renewalRouter.post("/submit", submitRenewal);
