"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
var login_1 = require("./login");
Object.defineProperty(exports, "loginUser", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
var register_1 = require("./register");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return __importDefault(register_1).default; } });
