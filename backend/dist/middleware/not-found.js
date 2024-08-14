"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({ errors: "resource not found" });
};
exports.default = notFound;
