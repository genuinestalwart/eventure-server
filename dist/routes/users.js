"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middlewares/verifyToken");
const users_1 = require("../controllers/users");
const userRoutes = express_1.default.Router();
userRoutes.get("/user/:uid", verifyToken_1.verifyToken, users_1.getUser);
exports.default = userRoutes;
