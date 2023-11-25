import { Router } from "express";
import { fetchRegisteredPeople, fetchSubmittedData, submitRegistration, submitRenewal } from "../controllers/register-controller";
import { fileHandling } from "../middlewares/busboy";

export const registerRouter = Router();

registerRouter.post("/submit",fileHandling, submitRegistration);
registerRouter.post("/submit", fileHandling, submitRenewal);

registerRouter.get("/fetch/registered", fetchRegisteredPeople);
registerRouter.get("/fetch/submitted/:id", fetchSubmittedData);

