
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

app.post('/personal/explain', async (req, res, next) => {

	try {
		let { content , level } = req.body

		let prompt = ""
		let inputRaw = ""
  
		prompt = `A five year old asked me what this passage means and I explained it for them, plain language a second grader can understand:\n###\n`  +
			`TEXT: An Intellectual Property clause will inform users that the contents, logo and other visual media you created is your property and is protected by copyright laws.\nELI5: This means that the words you write or images you draw are your property and you can do whatever you want with them.\n###\n` +
			`TEXT: Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky.\nELI5: Jupiter is a huge planet made of gas. It is the fifth planet from the sun. It is very big and bright. It is the third brightest object in the night sky after the moon and Venus.\n###\n` +
			`TEXT: An abnormal growth of cells which tend to proliferate in an uncontrolled way and, in some cases, to metastasize (spread). Cancer is not one disease. It is a group of more than 100 different and distinctive diseases. Cancer can involve any tissue of the body and have many different forms in each body area\nELI5: A kind of sick that makes your body grow extra bad stuff. It can be in any part of your body and it can be different in each part.\n###\n` +
			`TEXT: The Sun is over 4.5 billion years old and has a temperature of around 10,000 degrees Fahrenheit. The Sun's light reaches the Earth in eight minutes. Coronal mass ejections are gases on the Sun's surface erupt, shooting far out into space.\nELI5: The Sun is very old and very hot. It's light is the reason we have day time. Sometimes, the Sun shoots gas into space.\n###\n`
			inputRaw = `TEXT: ${content}\nELI5:`
			prompt += inputRaw
	
		if(level === "High School"){
			prompt = `A college student asked me what this passage means and I rephrased it for them, detailed language that the student can understand:\n###\n` +
			`TEXT: The Sun is very old and very hot. It's light is the reason we have day time. Sometimes, the Sun shoots gas into space.\nREPHRASED: The Sun is over 4.5 billion years old and has a temperature of around 10,000 degrees Fahrenheit. The Sun's light reaches the Earth in eight minutes. Coronal mass ejections are gases on the Sun's surface erupt, shooting far out into space.\n###\n` +
			`TEXT: Cancer is a kind of sick that makes your body grow extra bad stuff. It can be in any part of your body and it can be different in each part.\nREPHRASED: Cancer is an abnormal growth of cells which tend to proliferate in an uncontrolled way and, in some cases, to metastasize (spread). Cancer is not one disease. It is a group of more than 100 different and distinctive diseases. Cancer can involve any tissue of the body and have many different forms in each body area\n###\n` +
			`TEXT: Immunodeficiency where the child requires regular immunoglobin infusions.\nREPHRASED: Intravenous immunoglobulin (commonly referred to as IVIg) is used to treat many immune deficiency disorders and inflammatory conditions. An IVIg infusion is a common and safe procedure.\n###\n`
			inputRaw = `TEXT: ${content}\nREPHRASED:`
			prompt += inputRaw
		}


  
		const gptResponse = await openai.complete({
			engine: 'davinci',
			prompt,
			maxTokens: 128,
			temperature: 0.5,
			topP: 1,
			frequencyPenalty: 0.2,
			presencePenalty: 0,
			bestOf: 1,
			n: 1,
			user: req.user._id,
			stream: false,
			stop: ["###", "REPHRASED", "TEXT", "ELI5" ],
		});
		
		let output = `${gptResponse.data.choices[0].text}`

		req.locals.input = prompt
		req.locals.inputRaw = inputRaw
		req.locals.output = output

		next();

	} catch (err){
		console.log(err)
	}
	
})

module.exports = app