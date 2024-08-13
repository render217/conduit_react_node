import { Router } from "express";
import * as authCtrl from "../controllers/auth";
const authRoutes = Router();

authRoutes.post("/users/login", authCtrl.loginUser);
authRoutes.post("/users", authCtrl.registerUser);

export default authRoutes;
