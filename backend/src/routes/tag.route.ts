import { Router } from "express";
import * as tagCtrl from "../controllers/tags";
const tagRoutes = Router();

tagRoutes.get("/tags", tagCtrl.getTags);

export default tagRoutes;
