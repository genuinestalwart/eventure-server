"use strict";
/*
Checking whether the storage space is almost full or not
512mb is the limit, but checking at 500mb for safety
only used for CREATE, POST, PUT, PATCH methods
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageFull = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storageFull = async (req, res, next) => {
    const stats = await mongoose_1.default.connection.db?.stats();
    if (stats?.storageSize < 524288000) {
        next();
    }
    else {
        res.status(507).json({ code: "insufficient-storage" });
    }
};
exports.storageFull = storageFull;
