import mongoose from "mongoose";

export const recordSchema = new mongoose.Schema({
	datecreated: String,
	patient_id: String,
	type: String,
	dateofconsult: String,
	datedischarged: String,
	chiefcomplaint: String,
	subjective: String,
	objective: String,
	assessment: String,
	labs: String,
	plan: String,
	hmo: String,
	bill: String,
	disposition: String,
	paid: Boolean,
});
