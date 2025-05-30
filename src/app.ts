import cors from "cors";
require("dotenv").config();
import express, { Application } from "express";
const app: Application = express();

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://gs-eventure.vercel.app",
			"*",
		],
		methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
		credentials: true,
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.redirect("https://gs-eventure.vercel.app/");
});

export default app;
