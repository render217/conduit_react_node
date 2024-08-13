// Import the 'express' module
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
// all routes
app.use("/api", routes);

app.use("*", notFound);
app.use(errorHandler);

export default app;
