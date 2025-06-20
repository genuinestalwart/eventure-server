"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middlewares/verifyToken");
const users_1 = require("../controllers/users");
const storageFull_1 = require("../middlewares/storageFull");
const userRoutes = express_1.default.Router();
userRoutes.get("/user/:uid/full-name", users_1.getUserFullName);
userRoutes.get("/user/:uid", verifyToken_1.verifyToken, users_1.getUser);
userRoutes.patch("/user/update-name", storageFull_1.storageFull, verifyToken_1.verifyToken, users_1.updateName);
userRoutes.delete("/user/:uid", verifyToken_1.verifyToken, users_1.deleteUser);
exports.default = userRoutes;
