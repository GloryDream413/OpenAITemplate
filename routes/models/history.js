const mongoose = require("mongoose");

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const HistorySchema = new Schema({

	api: { type: String, default: "" },
	url: { type: String, default: "" },

	favorite: { type: Boolean, default: false }, // star //
	forgotten: { type: Boolean, default: false }, // don't show

	

	n: { 
		type: Number, 
		default: 0,
		integer: true,
		get: v => Math.round(v),
		set: v => Math.round(v),
	},

	inputLength: { 
		type: Number, 
		default: 0,
		integer: true,
		get: v => Math.round(v),
		set: v => Math.round(v),
	},

	outputLength: { 
		type: Number, 
		default: 0,
		integer: true,
		get: v => Math.round(v),
		set: v => Math.round(v),
	},

	credits: { 
		type: Number, 
		default: 0,
		integer: true,
		get: v => Math.round(v),
		set: v => Math.round(v),
	},

	price: { type: Number,  default: 0, },

	input: { type: String, default: "" },
	output: { type: String, default: "" },
	outputs: { type: Array, default: [String] },

	created: { type: Date, default: Date.now },
	user: {
		type: ObjectId,
		ref: "user",
	},
	
});

const History = mongoose.model('history', HistorySchema)
module.exports = History