import {
	createEvent,
	deleteEvent,
	endEvent,
	getEvent,
	getExpiredEvents,
	getJoinedEvents,
	getMyEvents,
	joinEvent,
	leaveEvent,
	startEvent,
	updateEvent,
} from "@/controllers/events";
import { storageFull } from "@/middlewares/storageFull";
import { verifyToken } from "@/middlewares/verifyToken";
import express from "express";
const eventRoutes = express.Router();
eventRoutes.get("/event/:eid", getEvent);
eventRoutes.get("/events/:uid/created", verifyToken, getMyEvents);
eventRoutes.get("/events/:uid/joined", verifyToken, getJoinedEvents);
eventRoutes.get("/events/:uid/expired", verifyToken, getExpiredEvents);
eventRoutes.post("/events", storageFull, verifyToken, createEvent);
eventRoutes.put("/event/update-details", storageFull, verifyToken, updateEvent);
eventRoutes.delete("/event/:eid", verifyToken, deleteEvent);
eventRoutes.patch("/event/start-event", verifyToken, startEvent);
eventRoutes.patch("/event/end-event", verifyToken, endEvent);
eventRoutes.patch("/event/join-event", storageFull, verifyToken, joinEvent);
eventRoutes.patch("/event/leave-event", verifyToken, leaveEvent);
export default eventRoutes;
