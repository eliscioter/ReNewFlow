import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post("/login", loginUser)
userRouter.delete("/logout/:id", logoutUser)