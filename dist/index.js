"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || "";
const connect = async () => {
    try {
        await mongoose_1.default.connect(uri, {
            serverApi: {
                version: "1",
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
app_1.default.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
