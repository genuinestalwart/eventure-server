import { Request } from "express";

export interface ExtendedRequest extends Request {
	decoded?: object;
}

export interface EventType {
	createdAt: number;
	createdBy: string;
	description: string;
	eid: string;
	endingAt: number;
	participants: string[];
	startingAt: number;
	status: string;
	title: string;
	venueLink: string;
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
