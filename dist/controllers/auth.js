"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = void 0;
const users_1 = __importDefault(require("../models/users"));
const utils_1 = require("../lib/utils");
const moment_1 = __importDefault(require("moment"));
const google = async (req, res) => {
    const { email, image, name } = req.body;
    if (!email || !image || !name) {
        res.status(400).json({ code: "missing-credentials" });
    }
    let user = await users_1.default.findOne({ email: email.toLowerCase() });
    // If user doesn't exist, create data.
    if (!user) {
        const createdAt = (0, moment_1.default)().unix();
        user = await users_1.default.create({
            avatar: image,
            createdAt,
            email: email.toLowerCase(),
            firstName: name.slice(0, 10).split(" ")[0],
            fullName: name.slice(0, 50),
            role: "user",
            uid: createdAt + "-" + (0, utils_1.generateHex)(4),
        });
    }
    else if (!user.avatar) {
        user.avatar = image;
        await user.save();
    }
    const userData = { email: user.email, uid: user.uid };
    const accessToken = (0, utils_1.generateToken)(userData);
    res.json({ accessToken, ...userData });
};
exports.google = google;
