"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const storageFull_1 = require("../middlewares/storageFull");
const express_1 = __importDefault(require("express"));
const authRoutes = express_1.default.Router();
authRoutes.post("/auth/google", storageFull_1.storageFull, auth_1.google);
exports.default = authRoutes;
