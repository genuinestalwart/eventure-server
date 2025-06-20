"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const event = new mongoose_1.Schema({
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
const EventModel = (0, mongoose_1.model)("Event", event, "events");
exports.default = EventModel;
