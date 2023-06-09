import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import patientRouter from "./routers/patientRouter.js";
import recordsRouter from "./routers/recordsRouter.js";

const app = express();

mongoose.set("strictQuery", false);
mongoose
	.connect("mongodb://mongo:OEgcv2kTVW50BixEc1oY@containers-us-west-56.railway.app:7175")
	.then(() => console.log("Connection to MongoDB: STATUS SUCCESS"))
	.catch((err) => console.error("Connection to MongoDB: STATUS FAILED"));

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/patients", patientRouter);
app.use("/records", recordsRouter);

const port = process.env.port || 3001;

app.listen(port, () => {
	console.log("Listening at port ", port);
});
