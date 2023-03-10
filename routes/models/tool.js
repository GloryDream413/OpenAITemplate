const mongoose = require("mongoose");

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const ToolSchema = new Schema({

	title: { type: String, default: "" },
	desc: { type: String, default: "" },
	category: { type: String, default: "" },
	Icon: { type: String, default: "" },

	permissions: [{ type: String, default: "user" }],

	fromColor: { type: String, default: "gray-800" },
	toColor: { type: String, default: "gray-600" },

	to: { type: String, default: "" },
	api: { type: String, default: "" },

	output: {
		title: { type: String, default: "" },
		desc: { type: String, default: "" },
		Icon: { type: String, default: "" },
		color: { type: String, default: "" },
	},

	prompts: [{
		title: { type: String, default: "" },
		desc: { type: String, default: "" },
		n: { type: Number, default: null },
		prompts: [
			{ 
				title: { type: String, default: "" },
				attr: { type: String, default: "" },
				value: { type: String, default: "" },
				placeholder: { type: String, default: "" }, 
				label: { type: String, default: "" },
				type: { type: String, default: "" },
				maxLength: { type: Number, default: 40 },
				options: [
					{ 
						title: { type: String, default: "" },
						value: { type: String, default: "" },
						label: { type: String, default: "" },
						desc: { type: String, default: "" },
						Icon: { type: String, default: "" }, 
					},
				],
				min: { type: Number, default: null },
				max: { type: Number, default: null },
				required: { type: Boolean, default: false },
				error:  { type: String, default: "" },
				example:  { type: String, default: "" },
			},
		],
		example: {
			output: { type: String, default: "" },
			outputs: [{ type: String, default: "" }],
			code: { type: String, default: "" },
		}
	}],

	created: { type: Date, default: Date.now },
});

const Tool = mongoose.model('tool', ToolSchema)
module.exports = Tool