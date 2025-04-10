"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateHex = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET || "";
const generateHex = (digits) => crypto_1.default.randomBytes(digits).toString("hex");
exports.generateHex = generateHex;
const generateToken = (data) => jsonwebtoken_1.default.sign(data, tokenSecret, { expiresIn: "1h" });
exports.generateToken = generateToken;
