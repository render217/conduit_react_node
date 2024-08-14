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
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const userProfile = yield db_1.prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive",
            },
        },
        select: {
            id: true,
            username: true,
            bio: true,
            image: true,
            followers: true,
        },
    });
    if (!userProfile) {
        return res.status(404).send({
            message: "user not found",
        });
    }
    const mappedProfile = Object.assign(Object.assign({}, userProfile), { followers: undefined, following: userProfile.followers.some((x) => { var _a; return x.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }) });
    res.send({ profile: mappedProfile });
});
exports.default = getProfile;
