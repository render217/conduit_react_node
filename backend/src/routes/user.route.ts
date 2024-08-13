import { Router } from "express";
import * as userCtrl from "../controllers/users";
import checkAuth from "../middleware/checkAuth";
const userRoutes = Router();

userRoutes.get("/user", checkAuth, userCtrl.getCurrentUser);
userRoutes.put("/user", checkAuth, userCtrl.updateUser);
userRoutes.get("/profiles/:username", checkAuth, userCtrl.getProfile);
userRoutes.post("/profiles/:username/follow", checkAuth, userCtrl.followUser);

userRoutes.delete(
    "/profiles/:username/unfollow",
    checkAuth,
    userCtrl.unFollowUser
);

export default userRoutes;
