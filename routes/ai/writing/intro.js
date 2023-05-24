
const express = require('express');
const openai = require('../../middlewares/openai');

let app = express.Router()

// input tokens: 150
// input characters: 600
// output tokens: 50
// output characters: 200

// Personal Tools
app.post('/writing/intro', async (req, res, next) => {
	try {
		let { title, audience, desc, keywords } = req.body

		if(desc){
			if (desc.length > 600) {
				desc = desc.substring(desc.length - 600)
			}
		}

		let prompt = `The following tool creates an introduction paragraph for an article based on metadata provided:\n"""\n` +

		// Example 1
		`Title: Complete Introduction to the 30 Most Essential Data Structures & Algorithms\n` + 
		`${audience ? `Audience: Programmers, Developers\n` : ``}` + 
		`${desc ? `Description: An article that covers why it's important to know data structures and algorithms as a topic, even if its scary, and how they apply in technology, work, and life.\n` : ``}` + 
		`${keywords ? `Keywords: Algorithms, Data, Structures, Coding, Learning\n` : ``}` + 
		`Introduction: Data Structures & Algorithms (DSA) is often considered to be an intimidating topic - a common misbelief. Forming the foundation of the most innovative concepts in tech, they are essential in both jobs/internships applicants' and experienced programmers' journey. Mastering DSA implies that you are able to use your computational and algorithmic thinking in order to solve never-before-seen problems and contribute to any tech company's value (including your own!). By understanding them, you can improve the maintainability, extensibility and efficiency of your code.\n` + 
		`"""\n` +

		// Example 2
		`Title: The Ultimate Guide To Branding Yourself: How To Make An Impact Without Spending A Fortune\n` + 
		`${audience ? `Audience: Marketing\n` : ``}` + 
		`${desc ? `Description: An article which covers ways to self brand, allowing you to be unique in a market that is already full. It makes the process possible without spending too much money while also building your own brand.\n` : ``}` + 
		`${keywords ? `Keywords: branding, marketing\n` : ``}` + 
		`Introduction: Turning yourself into a brand is the best way to stand out in the crowded marketplace of ideas and products. But it doesn’t have to be expensive. In this post, I’ll show you how to create a personal brand without breaking the bank.\n` + 
		`"""\n` +

		// Example 3
		`Title: The Importance of Artificial Intelligence: How It'll Impact the World in 10 Years\n` + 
		`${audience ? `Audience: AI Enthusiasts\n` : ``}` + 
		`${desc ? `Description: Exploring how the world is changing with the growth and use of AI that will have a bigger impact on day to day life now and in in the future.\n` : ``}` + 
		`${keywords ? `Keywords: AI, World, Technology\n` : ``}` + 
		`Introduction: Artificial intelligence is changing the world.\nIt will soon have an effect on every aspect of our lives, from the way we drive to the way we work. It’s a powerful and fast-moving tech force we can’t afford to ignore. Here’s what you need to know about this rapidly advancing field and how it will impact the world in 10 years.\n` + 
		`"""\n`

		

		let inputRaw = `Title: ${title}\n` + 
		`${audience ? `Audience: ${audience}\n` : ``}` + 
		`${desc ? `Description: ${desc}\n` : ``}` + 
		`${keywords ? `Keywords: ${keywords}\n` : ``}` + 
		`Introduction:` 


		prompt += inputRaw


		const gptResponse = await openai.complete({
			engine: 'davinci',
			prompt,
			maxTokens: 100,
			temperature: 0.8,
			frequencyPenalty: 0.2,
			presencePenalty: 0,
			bestOf: 1,
			topP: 1,
			n: 1,
			user: req.user._id,
			stream: false,
			stop: [`"""`, "Title:","Audience:", "Introduction:" ],
		});

		let output = `${gptResponse.data.choices[0].text}`

		// remove the first character from output
		output = output.substring(1, output.length)

		// If the output string ends with one or more hashtags, remove all of them
		if (output.endsWith('"')) {
			output = output.substring(0, output.length - 1)
		}

		// If the output string ends with one or more hashtags, remove all of them
		if (output.endsWith('"')) {
			output = output.substring(0, output.length - 1)
		}

		// remove a single new line at the end of output if there is one
		if (output.endsWith('\n')) {
			output = output.substring(0, output.length - 1)
		}
	
		req.locals.input = prompt
		req.locals.inputRaw = inputRaw
		req.locals.output = output

		next()

	} catch (err) {
		console.log(err)
	}
  })

  module.exports = app