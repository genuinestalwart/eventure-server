import { google } from "@/controllers/auth";
import { storageFull } from "@/middlewares/storageFull";
import express from "express";
const authRoutes = express.Router();
authRoutes.post("/auth/google", storageFull, google);
export default authRoutes;
