"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateName = exports.getUserFullName = exports.getUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUser = async (req, res) => {
    const skip = { _id: 0, __v: 0 };
    const user = await users_1.default.findOne({ uid: req.params.uid }, skip);
    res.json(user);
};
exports.getUser = getUser;
const getUserFullName = async (req, res) => {
    const included = { fullName: 1 };
    const user = await users_1.default.findOne({ uid: req.params.uid }, included);
    res.json(user);
};
exports.getUserFullName = getUserFullName;
const updateName = async (req, res) => {
    const { newName, uid } = req.body;
    if (!newName || !uid) {
        res.status(400).json({ code: "missing-required-data" });
    }
    try {
        const firstName = newName.trim().slice(0, 10).split(" ")[0];
        const fullName = newName.trim().slice(0, 50);
        const update = { $set: { firstName, fullName } };
        const result = await users_1.default.updateOne({ uid }, update);
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ code: "user-not-found" });
    }
    // const user = await UserModel.findOne({ uid });
    // if (user) {
    // 	user.firstName = newName.trim().slice(0, 10).split(" ")[0];
    // 	user.fullName = newName.trim().slice(0, 50);
    // 	await user.save();
    // 	res.json({ message: "Full name updated!" });
    // } else {
    // 	res.status(404).json({ code: "user-not-found" });
    // }
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
