import { Router } from "express";
import authRoutes from "./auth.route";
import articleRoutes from "./article.route";
import userRoutes from "./user.route";
import tagRoutes from "./tag.route";
const routes = Router();

routes.use(authRoutes);
// need middleware here

routes.use(userRoutes);
routes.use(articleRoutes);
routes.use(tagRoutes);

export default routes;
