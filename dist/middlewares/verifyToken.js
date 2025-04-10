"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET || "";
const verifyToken = async (req, res, next) => {
    // Checking if token is received or not
    if (!req.headers.authorization) {
        res.status(401).json({ code: "unauthorized-access" });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, tokenSecret, (error, decoded) => {
        // Checking if token is invalid or not
        if (error) {
            res.status(401).json({ code: "unauthorized-access" });
            return;
        }
        req.decoded = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
