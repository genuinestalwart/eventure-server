"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUser = async (req, res) => {
    const skip = { _id: 0, __v: 0 };
    const user = await users_1.default.findOne({ uid: req.params.uid }, skip);
    res.json(user);
};
exports.getUser = getUser;
