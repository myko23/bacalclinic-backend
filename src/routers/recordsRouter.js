import express from "express";
import { DateTime } from "luxon";
import mongoose from "mongoose";
import { recordSchema } from "../schema/recordsSchema.js";

const app = express.Router();

const Record = mongoose.model("Record", recordSchema);

app.get("/", async (req, res) => {
	const recordsData = await Record.find().select("-__v");
	res.send(recordsData);
});
app.post("/", async (req, res) => {
	let newRecord = new Record({ ...req.body, datecreated: DateTime.now().toFormat("MM-dd-yyyy") });
	try {
		newRecord = await newRecord.save();
		res.send(newRecord);
	} catch (error) {
		return res.status(400).send(error.message);
	}
});
app.put("/:id", async (req, res) => {
	try {
		let newRecord = await Record.findByIdAndUpdate(req.params.id, req.body);

		if (!newRecord) return res.status(404).send("The record with the given ID does not exist");

		res.send(newRecord);
	} catch (err) {
		console.log(err.message);
		return res.status(404).send(err.message);
	}
});
app.delete("/:id", async (req, res) => {
	try {
		await Record.deleteOne({ _id: req.params.id });
		res.send("Successfully Deleted");
	} catch (err) {
		console.log(err.message);
		return res.status(404).send(err.message);
	}
});

export default app;
