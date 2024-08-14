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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../prisma/db");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { user: { username, email, bio, image }, } = req.body;
    if (email) {
        const checkDuplicateEmail = yield db_1.prisma.user.findUnique({
            where: { email: email },
        });
        if (checkDuplicateEmail && checkDuplicateEmail.id !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(400).json({
                message: "Email has already been taken",
            });
        }
    }
    const updatedUser = yield db_1.prisma.user.update({
        where: { id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id },
        data: {
            username: username !== null && username !== void 0 ? username : (_c = req.user) === null || _c === void 0 ? void 0 : _c.username,
            email: email !== null && email !== void 0 ? email : (_d = req.user) === null || _d === void 0 ? void 0 : _d.email,
            bio: bio !== null && bio !== void 0 ? bio : (_e = req.user) === null || _e === void 0 ? void 0 : _e.bio,
            image: image !== null && image !== void 0 ? image : (_f = req.user) === null || _f === void 0 ? void 0 : _f.image,
        },
        select: {
            id: true,
            username: true,
            email: true,
            bio: true,
            image: true,
        },
    });
    res.send(updatedUser);
});
exports.default = updateUser;
