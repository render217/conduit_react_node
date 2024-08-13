"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
// Define a route for the root path ('/')
app_1.default.get("/", (req, res) => {
    // Send a response to the client
    res.send("Hello, TypeScript + Node.js + Express!");
});
// Start the server and listen on the specified port
app_1.default.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
