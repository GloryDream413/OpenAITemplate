const mongoose = require("mongoose");

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const FeedbackSchema = new Schema({
	feedback: { type: String, maxLength: 1024, default: "" },
	response: { type: String, maxLength: 2048, default: "" },
	created: { type: Date, default: Date.now },
	email: { type: String, maxLength: 1024 },
	user: {
		type: ObjectId,
		ref: "user",
	},
});

const Feedback = mongoose.model('feedback', FeedbackSchema)
module.exports = Feedback