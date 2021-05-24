const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	requirements: { type: String, required: true },
	notes: { type: String, required: true },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
