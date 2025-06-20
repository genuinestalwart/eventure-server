import { EventType } from "@/types/global";
import { model, Schema } from "mongoose";

const event = new Schema<EventType>({
	createdAt: { type: Number, required: true, immutable: true },
	createdBy: { type: String, required: true, immutable: true },
	description: { type: String, required: true },
	eid: { type: String, required: true, immutable: true },
	endingAt: { type: Number, required: true },
	participants: [{ type: String, required: true }],
	startingAt: { type: Number, required: true },
	status: { type: String, required: true },
	title: { type: String, required: true },
	venueLink: { type: String, required: true },
});

const EventModel = model("Event", event, "events");
export default EventModel;
