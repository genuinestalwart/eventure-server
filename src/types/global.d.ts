import { Request } from "express";

export interface ExtendedRequest extends Request {
	decoded?: object;
}

export interface User {
	avatar?: string;
	createdAt: number;
	email: string;
	firstName: string;
	fullName: string;
	role: string;
	uid: string;
}
