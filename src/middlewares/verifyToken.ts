import { ExtendedRequest } from "@/types/global";
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET || "";

export const verifyToken = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction
) => {
	// Checking if token is received or not
	if (!req.headers.authorization) {
		res.status(401).json({ code: "unauthorized-access" });
		return;
	}

	const token = req.headers.authorization.split(" ")[1];

	jwt.verify(token, tokenSecret, (error, decoded) => {
		// Checking if token is invalid or not
		if (error) {
			res.status(401).json({ code: "unauthorized-access" });
			return;
		}

		req.decoded = decoded as JwtPayload;
		next();
	});
};
