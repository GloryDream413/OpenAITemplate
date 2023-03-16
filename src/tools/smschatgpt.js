import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "SMSChatGPT Prompt",
	desc: "Analyze your text or documents and convey the important concepts in bullet form.",
	category: "Business",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "gray-500",
	toColor: "gray-500",

	to: "/ai/smschatgpt",
	api: "/ai/smschatgpt",

	output: {
		title: "SMS ChatGPT",
		desc: "The following key points detected",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"SMS ChatGPT Ad",
		desc: "Write a short few words about the ad",
		// n: 1,
		prompts: [{ 
				title: "Content", 
				attr: "content",  
				value: "", 
				placeholder: "Plz write your world would like to know.", 
				label: "Examples: I'd like to know about SMS ChatGPT",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Hi. I'd like to know about SMS ChatGPT",
			},
		],
		example: {
			output: "SMS ChatGPT allows you to get response by sms chat.",
			// outputs: [
			// 	"The sun is very old, over 4.5 billion years",
			// 	"At 10,000 degrees, sun is also very hot",
			// 	"Gasses called coronal mass ejections erupt from the sun",
			// ],
			// Icon: RefreshIcon,
			color: "blue",
		}
	}]
		
}

export default obj

