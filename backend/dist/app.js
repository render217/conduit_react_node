"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FRONTEND_URI = process.env.FRONTEND_URI;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", FRONTEND_URI],
    credentials: true,
}));
app.use("/api", routes_1.default);
app.use("*", not_found_1.default);
app.use(error_handler_1.default);
exports.default = app;
