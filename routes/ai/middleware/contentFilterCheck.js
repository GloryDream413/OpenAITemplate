const openai = require('../../middlewares/openai');

const contentFilterCheck = async (req, res, next) => {

	let content = ``

	if(req.locals.outputs){
		for (let i = 0; i < req.locals.outputs.length; i++) {
			content += req.locals.outputs[i] 
		}
		req.locals.outputsString = `${content}`
	}
	
	if(req.locals.output){
		content += req.locals.output 
	}

	if(req.locals.skipFilter){
		content = ""
	}

	if(content !== ""){
		// add Hello at the start of the content string
		content = `<|endoftext|>${content}`

		// Add label to end end of the content string
		content += `\n--\nLabel:`

		const gptResponse = await openai.complete({
			engine: 'content-filter-alpha-c4',
			prompt: content,
			maxTokens: 1,
			temperature: 0,
			topP: 0,
			user: req.user._id,
			logprobs: 10,
			frequencyPenalty: 0,
			presencePenalty: 0,
			stream: false,
		});

		if(gptResponse.data.choices[0].text == "2"){
			// console.log(`Unsafe content`, gptResponse.data.choices[0].text, content)
			
			let toxic_threshold = -0.355
			let response = gptResponse.data
			let output_label = "1"

			//   # If both "0" and "1" have probabilities, set the output label
			// # to whichever is most probable


			if (response["choices"][0]["logprobs"]["top_logprobs"][0]["2"] < toxic_threshold) {
				let logprob_0 = response["choices"][0]["logprobs"]["top_logprobs"][0]
				let logprob_1 = response["choices"][0]["logprobs"]["top_logprobs"][1]
				
				// If both "0" and "1" have probabilities, set the output label
				// to whichever is most probable
				if (logprob_0 != null && logprob_1 != null) {
					if (logprob_0 >= logprob_1) {
						output_label = "0";
					} else {
						output_label = "1";
					}
				} else if (logprob_0 != null) {
					output_label = "0";
				} else if (logprob_1 != null) {
					output_label = "1";
				}
			}

			if(output_label !== "0" || output_label !== "1"){
				res.json({
					success: false,
					error: "Unsafe content",
					message: "Unsafe content , please try different language"
				})
				return
			} else {
				next()
			}
			
		} else {
			next()
		}
	} else {
		next()
	}
}

module.exports = contentFilterCheck