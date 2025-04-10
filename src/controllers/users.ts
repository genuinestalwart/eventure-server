import { Request, Response } from "express";
import UserModel from "@/models/users";

export const getUser = async (req: Request, res: Response) => {
	const skip = { _id: 0, __v: 0 };
	const user = await UserModel.findOne({ uid: req.params.uid }, skip);
	res.json(user);
};
