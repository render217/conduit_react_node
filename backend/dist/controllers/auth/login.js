"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../prisma/db");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { email, password }, } = req.body;
    const errors = [];
    if (!email) {
        errors.push({ email: ["email is required"] });
    }
    if (!password) {
        errors.push({ password: ["password is required"] });
    }
    if (errors.length) {
        return res.status(422).json({ errors });
    }
    const user = yield db_1.prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(400).json({
            message: "email or password is incorrect.(e not found)",
        });
    }
    const isPasswordValid = (0, bcrypt_1.compareSync)(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "email or password is incorrect.(p not correct)",
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
    const payload = {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio || "",
            image: user.image || null,
            token,
        },
    };
    res.json(payload);
});
exports.default = loginUser;
