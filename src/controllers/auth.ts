import UserModel from "@/models/users";
import { generateHex, generateToken } from "@/lib/utils";
import { Request, Response } from "express";
import moment from "moment";

export const google = async (req: Request, res: Response) => {
	const { email, image, name } = req.body;

	if (!email || !image || !name) {
		res.status(400).json({ code: "missing-credentials" });
	}

	let user = await UserModel.findOne({ email: email.toLowerCase() });

	// If user doesn't exist, create data.

	if (!user) {
		const createdAt = moment().unix();

		user = await UserModel.create({
			avatar: image,
			createdAt,
			email: email.toLowerCase(),
			firstName: name.slice(0, 10).split(" ")[0],
			fullName: name.slice(0, 50),
			role: "user",
			uid: createdAt + "-" + generateHex(4),
		});
	} else if (!user.avatar) {
		user.avatar = image;
		await user.save();
	}

	const userData = { email: user.email, uid: user.uid };
	const accessToken = generateToken(userData);
	res.json({ accessToken, ...userData });
};
