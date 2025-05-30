"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateName = exports.getUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUser = async (req, res) => {
    const skip = { _id: 0, __v: 0 };
    const user = await users_1.default.findOne({ uid: req.params.uid }, skip);
    res.json(user);
};
exports.getUser = getUser;
const updateName = async (req, res) => {
    const { newName, uid } = req.body;
    if (!newName || !uid) {
        res.status(400).json({ code: "missing-data" });
    }
    const user = await users_1.default.findOne({ uid });
    if (user) {
        user.firstName = newName.trim().slice(0, 10).split(" ")[0];
        user.fullName = newName.trim().slice(0, 50);
        await user.save();
        res.json({ message: "Full Name Updated!" });
    }
    else {
        res.status(404).json({ code: "user-not-found" });
    }
};
exports.updateName = updateName;
const deleteUser = async (req, res) => {
    try {
        const result = await users_1.default.deleteOne({ uid: req.params.uid });
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ code: "user-not-found" });
    }
};
exports.deleteUser = deleteUser;
