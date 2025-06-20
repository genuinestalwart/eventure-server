"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const events_1 = __importDefault(require("./routes/events"));
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "";
const connect = async () => {
    try {
        await mongoose_1.default.connect(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
    }
    finally {
        // await mongoose.disconnect();
    }
};
// Establish a connection with mongodb first, then do everything
connect();
app_1.default.use("/", auth_1.default);
app_1.default.use("/", users_1.default);
app_1.default.use("/", events_1.default);
app_1.default.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
