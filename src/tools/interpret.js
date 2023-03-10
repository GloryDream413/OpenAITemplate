import {
	ChevronRightIcon,
} from '@heroicons/react/solid'

import {
	EyeIcon,
} from '@heroicons/react/outline'



const obj = {

	title: "Explain Code",
	desc: "Interpret some code based on the language, code, and syntax provided",
	category: "Programming",
	Icon: EyeIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "gray-800",
	toColor: "gray-600",

	to: "/ai/code/interpret",
	api: "/ai/code/interpret",

	output: {
		title: "What does this code do",
		desc: "The following code does:",
		Icon: ChevronRightIcon,
		color: "gray",
	},

	prompts: [{
		title:"Interpret Code",
		desc: "Write details about your code below",
		// n: 1,
		prompts: [
			{ 
				title: "Language", 
				attr: "language",  
				value: "", 
				placeholder: "JavaScript...", 
				label: "Which language are you using, will enable markup highlights",
				type: "text",
				maxLength: 40,
				// options: [{ title: "2nd Grader", value: "2nd Grader", desc: "Explain this like I'm 5 years old", Icon: AnnotationIcon },],
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: `JavaScript`,
			},
			{ 
				title: "Code Editor", 
				attr: "content",  
				value: "", 
				placeholder: "function Name(attr){...", 
				label: "Place some code above to understand how it works",
				type: "code",
				maxLength: 2000,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: `function HelloWorld(text){ 
	let text || "Hello World"; 
	console.log(text);
}`,
			},
		],
		example: {
			output: ``,
			outputs: [
				"The code above is a function definition.",
				"It defines a new function called `HelloWorld` that takes a single argument called `text`",
				"The body of the function is a single line of code that prints out the value of `text` if it is defined, or `Hello World` if it is not defined."
			],
			// Icon: TerminalIcon,
			// color: "gray",
		}
	}]
		
}

export default obj

