import { Request, Response } from "express";
import UserModel from "@/models/users";
import { RootFilterQuery } from "mongoose";
import { User } from "@/types/global";

export const getUser = async (req: Request, res: Response) => {
	const skip: RootFilterQuery<User> = { _id: 0, __v: 0 };
	const user = await UserModel.findOne({ uid: req.params.uid }, skip);
	res.json(user);
};

export const updateName = async (req: Request, res: Response) => {
	const { newName, uid } = req.body;

	if (!newName || !uid) {
		res.status(400).json({ code: "missing-data" });
	}

	const user = await UserModel.findOne({ uid });

	if (user) {
		user.firstName = newName.trim().slice(0, 10).split(" ")[0];
		user.fullName = newName.trim().slice(0, 50);
		await user.save();
		res.json({ message: "Full Name Updated!" });
	} else {
		res.status(404).json({ code: "user-not-found" });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await UserModel.deleteOne({ uid: req.params.uid });
		res.json(result);
	} catch (error) {
		res.status(404).json({ code: "user-not-found" });
	}
};
