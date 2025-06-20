"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveEvent = exports.joinEvent = exports.endEvent = exports.startEvent = exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getExpiredEvents = exports.getJoinedEvents = exports.getMyEvents = exports.getEvent = void 0;
const utils_1 = require("../lib/utils");
const events_1 = __importDefault(require("../models/events"));
const moment_1 = __importDefault(require("moment"));
const getEvent = async (req, res) => {
    const skip = { _id: 0, __v: 0 };
    const event = await events_1.default.findOne({ eid: req.params.eid }, skip);
    res.json(event);
};
exports.getEvent = getEvent;
const getMyEvents = async (req, res) => {
    const result = await events_1.default.find({ createdBy: req.params.uid });
    res.json(result);
};
exports.getMyEvents = getMyEvents;
const getJoinedEvents = async (req, res) => {
    const { uid } = req.params;
    const joined = { participants: uid, status: { $ne: "expired" } };
    const result = await events_1.default.find(joined);
    res.json(result);
};
exports.getJoinedEvents = getJoinedEvents;
const getExpiredEvents = async (req, res) => {
    const { uid } = req.params;
    const expired = { participants: uid, status: "expired" };
    const result = await events_1.default.find(expired);
    res.json(result);
};
exports.getExpiredEvents = getExpiredEvents;
const createEvent = async (req, res) => {
    const { createdBy, description, endingAt, startingAt, title, venueLink } = req.body;
    if (!createdBy ||
        !description ||
        !endingAt ||
        !startingAt ||
        !title ||
        !venueLink) {
        res.status(400).json({ code: "missing-required-data" });
    }
    const createdAt = (0, moment_1.default)().unix();
    const event = await events_1.default.create({
        createdAt,
        createdBy,
        description,
        eid: createdAt + "-" + (0, utils_1.generateHex)(4),
        endingAt,
        participants: [],
        startingAt,
        status: "upcoming",
        title,
        venueLink,
    });
    res.json(event);
};
exports.createEvent = createEvent;
const updateEvent = async (req, res) => {
    const { description, eid, endingAt, startingAt, title, venueLink } = req.body;
    if (!description ||
        !eid ||
        !endingAt ||
        !startingAt ||
        !title ||
        !venueLink) {
        res.status(400).json({ code: "missing-required-data" });
    }
    try {
        const update = { description, endingAt, startingAt, title, venueLink };
        const result = await events_1.default.updateOne({ eid }, { $set: update });
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ code: "event-not-found" });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const result = await events_1.default.deleteOne({ eid: req.params.eid });
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ code: "event-not-found" });
    }
};
exports.deleteEvent = deleteEvent;
const updateStatus = async (req, res, status) => {
    const { eid, uid } = req.body;
    if (!eid || !uid) {
        res.status(400).json({ code: "missing-required-data" });
    }
    try {
        const filter = { eid, createdBy: uid };
        const update = { $set: { status } };
        const result = await events_1.default.updateOne(filter, update);
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ code: "event-not-found" });
    }
};
const startEvent = async (req, res) => {
    await updateStatus(req, res, "ongoing");
};
exports.startEvent = startEvent;
const endEvent = async (req, res) => {
    await updateStatus(req, res, "expired");
};
exports.endEvent = endEvent;
const updateParticipants = async (req, res, join) => {
    const { eid, uid } = req.body;
    if (!eid || !uid) {
        res.status(400).json({ code: "missing-required-data" });
    }
    const update = join
        ? { $push: { participants: uid } }
        : { $pull: { participants: uid } };
    try {
        const filter = { eid, createdBy: { $ne: uid } };
        const result = await events_1.default.updateOne(filter, update);
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ code: "event-not-found" });
    }
};
const joinEvent = async (req, res) => {
    await updateParticipants(req, res, true);
};
exports.joinEvent = joinEvent;
const leaveEvent = async (req, res) => {
    await updateParticipants(req, res, false);
};
exports.leaveEvent = leaveEvent;
