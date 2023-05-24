
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

app.post('/personal/summarize', async (req, res, next) => {
	try {
		let { content } = req.body
  
	let prompt = `List what key points are, in simple language, based from the text:\n###\n` +

	`TEXT: Programmers that don't blog should start right now. You're future self with thank you when your blog helps you getting a better job, earn more money and of course, have an easier time learning new concepts.\n` +
	`KEY POINTS: 1. Programmers should start blogging\n2. Blogging helps you get a better job\n3. You can earn more money by blogging\n4. Learn new concepts easier by blogging about them\n###\n` +

	`TEXT: A tort is an act or omission that gives rise to injury or harm to another and amounts to a civil wrong for which courts impose liability. In the context of torts, 'injury' describes the invasion of any legal right, whereas 'harm' describes a loss or detriment in fact that an individual suffers.\n` +
	`KEY POINTS: 1. Tort are when you hide information that causes harm or injury\n2. Injury in the context of tort can an invasion of legal rights\n3. Harm can be ways in which a person suffers a type of loss.\n###\n`

	let inputRaw = `TEXT: ${content}\nKEY POINTS: 1.`
	prompt += inputRaw

	const gptResponse = await openai.complete({
		engine: 'curie',
		prompt,
		maxTokens: 150,
		temperature: 0.2,
		topP: 1,
		frequencyPenalty: 1,
		presencePenalty: 0,
		bestOf: 1,
		n: 1,
		user: req.user._id,
		stream: false,
		stop: ["###", "<|endoftext|>", ],
	});

	let outputs = []

	if(gptResponse.data.choices[0].text){
		// Split break lines
		outputs = `1.${gptResponse.data.choices[0].text}`.split('\n')

		// remove entries with spaces or empty
		outputs = outputs.filter(function(output) {
			return (!(output === "" || output === " " || output === "\n"))
		})

		// remove numbers and spaces
		for (let i = 0; i < outputs.length; i++) {
			outputs[i] = outputs[i].substring(3)
			outputs[i] = outputs[i].replace(/^\s+|\s+$/g, '')
		}
		// remove duplicates
		outputs = outputs.filter((item, pos, self) => self.indexOf(item) === pos)
	}

	req.locals.input = prompt
	req.locals.inputRaw = inputRaw
	req.locals.outputs = outputs

	next()

	} catch (err){
		console.log(err.response)
		console.log(err.data)
		console.log(err.message)
	}
	
  })

module.exports = app