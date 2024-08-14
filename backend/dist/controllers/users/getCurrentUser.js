"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrentUser = (req, res) => {
    res.send(req.user);
};
exports.default = getCurrentUser;
