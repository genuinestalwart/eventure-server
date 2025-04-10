import express from "express";
import { verifyToken } from "@/middlewares/verifyToken";
import { getUser } from "@/controllers/users";
const userRoutes = express.Router();
userRoutes.get("/user/:uid", verifyToken, getUser);
export default userRoutes;
