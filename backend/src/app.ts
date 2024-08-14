import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const FRONTEND_URI = process.env.FRONTEND_URI as string;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:5173", FRONTEND_URI],
        credentials: true,
    })
);

app.use("/api", routes);
app.use("*", notFound);
app.use(errorHandler);

export default app;
