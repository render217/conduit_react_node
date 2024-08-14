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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (!user) {
        return res.status(422).json({
            errors: {
                username: ["username is required"],
                email: ["email is required"],
                password: ["password is required"],
            },
        });
    }
    const errors = [];
    if (!user.username) {
        errors.push({ username: ["username is required"] });
    }
    if (!user.email) {
        errors.push({ email: ["email is required"] });
    }
    if (!user.password) {
        errors.push({ password: ["password is required"] });
    }
    if (errors.length) {
        return res.status(422).json({ errors });
    }
    const existingUser = yield db_1.prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (existingUser) {
        return res.status(400).json({
            message: "Email has already been taken",
        });
    }
    const newUser = yield db_1.prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: (0, bcrypt_1.hashSync)(user.password, 10),
        },
    });
    const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET);
    const payload = {
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio || "",
            image: newUser.image || null,
            token,
        },
    };
    res.json(payload);
});
exports.default = registerUser;
