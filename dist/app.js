"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://gs-eventure.vercel.app",
        "*",
    ],
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.redirect("https://gs-eventure.vercel.app/");
});
exports.default = app;
