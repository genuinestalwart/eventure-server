import { generateHex } from "@/lib/utils";
import EventModel from "@/models/events";
import { EventType } from "@/types/global";
import { Request, Response } from "express";
import moment from "moment";
import { RootFilterQuery } from "mongoose";

export const getEvent = async (req: Request, res: Response) => {
	const skip: RootFilterQuery<EventType> = { _id: 0, __v: 0 };
	const event = await EventModel.findOne({ eid: req.params.eid }, skip);
	res.json(event);
};

export const getMyEvents = async (req: Request, res: Response) => {
	const result = await EventModel.find({ createdBy: req.params.uid });
	res.json(result);
};

export const getJoinedEvents = async (req: Request, res: Response) => {
	const { uid } = req.params;
	const joined = { participants: uid, status: { $ne: "expired" } };
	const result = await EventModel.find(joined);
	res.json(result);
};

export const getExpiredEvents = async (req: Request, res: Response) => {
	const { uid } = req.params;
	const expired = { participants: uid, status: "expired" };
	const result = await EventModel.find(expired);
	res.json(result);
};

export const createEvent = async (req: Request, res: Response) => {
	const { createdBy, description, endingAt, startingAt, title, venueLink } =
		req.body;

	if (
		!createdBy ||
		!description ||
		!endingAt ||
		!startingAt ||
		!title ||
		!venueLink
	) {
		res.status(400).json({ code: "missing-required-data" });
	}

	const createdAt = moment().unix();

	const event = await EventModel.create({
		createdAt,
		createdBy,
		description,
		eid: createdAt + "-" + generateHex(4),
		endingAt,
		participants: [],
		startingAt,
		status: "upcoming",
		title,
		venueLink,
	});

	res.json(event);
};

export const updateEvent = async (req: Request, res: Response) => {
	const { description, eid, endingAt, startingAt, title, venueLink } =
		req.body;

	if (
		!description ||
		!eid ||
		!endingAt ||
		!startingAt ||
		!title ||
		!venueLink
	) {
		res.status(400).json({ code: "missing-required-data" });
	}

	try {
		const update = { description, endingAt, startingAt, title, venueLink };
		const result = await EventModel.updateOne({ eid }, { $set: update });
		res.json(result);
	} catch (error) {
		res.status(404).json({ code: "event-not-found" });
	}
};

export const deleteEvent = async (req: Request, res: Response) => {
	try {
		const result = await EventModel.deleteOne({ eid: req.params.eid });
		res.json(result);
	} catch (error) {
		res.status(404).json({ code: "event-not-found" });
	}
};

const updateStatus = async (req: Request, res: Response, status: string) => {
	const { eid, uid } = req.body;

	if (!eid || !uid) {
		res.status(400).json({ code: "missing-required-data" });
	}

	try {
		const filter = { eid, createdBy: uid };
		const update = { $set: { status } };
		const result = await EventModel.updateOne(filter, update);
		res.json(result);
	} catch (error) {
		res.status(404).json({ code: "event-not-found" });
	}
};

export const startEvent = async (req: Request, res: Response) => {
	await updateStatus(req, res, "ongoing");
};

export const endEvent = async (req: Request, res: Response) => {
	await updateStatus(req, res, "expired");
};

const updateParticipants = async (
	req: Request,
	res: Response,
	join: boolean
) => {
	const { eid, uid } = req.body;

	if (!eid || !uid) {
		res.status(400).json({ code: "missing-required-data" });
	}

	const update = join
		? { $push: { participants: uid } }
		: { $pull: { participants: uid } };

	try {
		const filter = { eid, createdBy: { $ne: uid } };
		const result = await EventModel.updateOne(filter, update);
		res.json(result);
	} catch (error) {
		res.status(404).json({ code: "event-not-found" });
	}
};

export const joinEvent = async (req: Request, res: Response) => {
	await updateParticipants(req, res, true);
};

export const leaveEvent = async (req: Request, res: Response) => {
	await updateParticipants(req, res, false);
};
