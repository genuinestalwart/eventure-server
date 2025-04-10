require("dotenv").config();
import mongoose from "mongoose";
import app from "@/app";
import userRoutes from "@/routes/users";
import authRoutes from "@/routes/auth";
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || "";

const connect = async () => {
	try {
		await mongoose.connect(uri, {
			serverApi: {
				version: "1",
				strict: true,
				deprecationErrors: true,
			},
		});
	} finally {
		// await mongoose.disconnect();
	}
};

// Establish a connection with mongodb first, then do everything
connect();
app.use("/", authRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
