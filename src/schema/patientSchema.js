import mongoose from "mongoose";

export const patientSchema = new mongoose.Schema({
	datecreated: String,
	firstname: String,
	middlename: String,
	lastname: String,
	birthday: String,
	contactno: String,
	address: String,
	guardian: String,
	relationship: String,
	religion: String,
	past_history: String,
	current_condition: String,
	allergies: String,
});
