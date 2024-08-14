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
const unFollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const isOwnProfile = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === targetUser.id;
    if (isOwnProfile) {
        return res.status(400).send({
            message: "You can't follow or unfollow yourself",
        });
    }
    const setupUnFollowing = yield db_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const followee = yield prisma.user.update({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            },
            data: {
                following: {
                    disconnect: {
                        id: targetUser.id,
                    },
                },
            },
        });
        const tobeUnFollowed = yield prisma.user.update({
            where: {
                id: targetUser.id,
            },
            data: {
                followers: {
                    disconnect: {
                        id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                    },
                },
            },
            include: {
                followers: true,
            },
        });
        return { followee, tobeUnFollowed };
    }));
    const mappedTobeFollowed = {
        id: setupUnFollowing.tobeUnFollowed.id,
        username: setupUnFollowing.tobeUnFollowed.username,
        bio: setupUnFollowing.tobeUnFollowed.bio,
        image: setupUnFollowing.tobeUnFollowed.image,
        following: setupUnFollowing.tobeUnFollowed.followers.some((x) => { var _a; return x.id.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id.toString()); }),
    };
    res.send({
        profile: mappedTobeFollowed,
        message: "successfully unfollowed user",
    });
});
exports.default = unFollowUser;
