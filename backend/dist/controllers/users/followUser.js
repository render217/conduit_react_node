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
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username } = req.params;
    const targetUser = yield db_1.prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive",
            },
        },
    });
    if (!targetUser) {
        return res.status(404).send({
            message: "user not found",
        });
    }
    const isOwnProfile = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id.toString()) === targetUser.id.toString();
    if (isOwnProfile) {
        return res.status(400).send({
            message: "You can't follow yourself",
        });
    }
    const setupFollowing = yield db_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const followee = yield prisma.user.update({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            },
            data: {
                following: {
                    connect: {
                        id: targetUser.id,
                    },
                },
            },
        });
        const tobeFollowed = yield prisma.user.update({
            where: {
                id: targetUser.id,
            },
            data: {
                followers: {
                    connect: {
                        id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                    },
                },
            },
            include: {
                followers: true,
            },
        });
        return { followee, tobeFollowed };
    }));
    const mappedTobeFollowed = {
        id: setupFollowing.tobeFollowed.id,
        username: setupFollowing.tobeFollowed.username,
        bio: setupFollowing.tobeFollowed.bio,
        image: setupFollowing.tobeFollowed.image,
        following: setupFollowing.tobeFollowed.followers.some((x) => { var _a; return x.id.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id.toString()); }),
    };
    res.send({
        profile: mappedTobeFollowed,
        message: "successfully followed user",
    });
});
exports.default = followUser;
