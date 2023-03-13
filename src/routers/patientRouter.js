import express from "express";
import { DateTime } from "luxon";
import mongoose from "mongoose";
import { patientSchema } from "../schema/patientSchema.js";
import { recordSchema } from "../schema/recordsSchema.js";

const app = express.Router();

const Patient = mongoose.model("Patient", patientSchema);
const Record = mongoose.model("Record", recordSchema);

app.get("/", async (req, res) => {
	const patientData = await Patient.find().select("-__v");
	res.send(patientData);
});
app.post("/", async (req, res) => {
	let newPatient = new Patient({ ...req.body, datecreated: DateTime.now().toFormat("MM-dd-yyyy") });
	try {
		newPatient = await newPatient.save();
		res.send(newPatient);
	} catch (error) {
		return res.status(400).send(error.message);
	}
});
app.put("/:id", async (req, res) => {
	try {
		let newPatient = await Patient.findByIdAndUpdate(req.params.id, req.body);

		if (!newPatient) return res.status(404).send("The patient with the given ID does not exist");

		res.send(newPatient);
	} catch (err) {
		console.log(err.message);
		return res.status(404).send(err.message);
	}
});
app.delete("/:id", async (req, res) => {
	try {
		await Patient.deleteOne({ _id: req.params.id });
		await Record.deleteMany({ patient_id: req.params.id });
		res.send("Successfully Deleted");
	} catch (err) {
		console.log(err.message);
		return res.status(404).send(err.message);
	}
});

export default app;
