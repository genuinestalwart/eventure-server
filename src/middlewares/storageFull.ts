/*
Checking whether the storage space is almost full or not
512mb is the limit, but checking at 500mb for safety
only used for CREATE, POST, PUT, PATCH methods
*/

import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const storageFull = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const stats = await mongoose.connection.db?.stats();

	if (stats?.storageSize < 524288000) {
		next();
	} else {
		res.status(507).json({ code: "insufficient-storage" });
	}
};
