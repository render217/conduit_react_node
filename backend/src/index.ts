import app from "./app";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
