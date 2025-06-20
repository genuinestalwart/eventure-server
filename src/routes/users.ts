import express from "express";
import { verifyToken } from "@/middlewares/verifyToken";
import {
	deleteUser,
	getUser,
	getUserFullName,
	updateName,
} from "@/controllers/users";
import { storageFull } from "@/middlewares/storageFull";
const userRoutes = express.Router();
userRoutes.get("/user/:uid/full-name", getUserFullName);
userRoutes.get("/user/:uid", verifyToken, getUser);
userRoutes.patch("/user/update-name", storageFull, verifyToken, updateName);
userRoutes.delete("/user/:uid", verifyToken, deleteUser);
export default userRoutes;
