import { Router } from "express";
import { fetchAllRenewalsCount, fetchGenderDemographics, fetchRegisteredCount, fetchRegisteredPeople, fetchRenewalsCount, fetchSubmittedData } from "../controllers/demographics-controller";

export const demographicsRouter = Router();


demographicsRouter.get("/fetch/registered", fetchRegisteredPeople);
demographicsRouter.get("/fetch/submitted/:id", fetchSubmittedData);
demographicsRouter.get("/fetch/gender-count", fetchGenderDemographics)
demographicsRouter.get("/fetch/all-renewal-count", fetchAllRenewalsCount)
demographicsRouter.get("/fetch/renewal-count", fetchRenewalsCount)
demographicsRouter.get("/fetch/register-count", fetchRegisteredCount)