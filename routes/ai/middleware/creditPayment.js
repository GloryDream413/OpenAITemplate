const db = require("../../models");
const User = db.user;

const creditPayment = async (req, res, next) => {

	// Prepare credit check on req

	let inputLength = 0
	let outputLength = 0

	if(req.locals.input){
		inputLength = inputLength + req.locals.input.length
	}

	if(req.locals.output){
		outputLength = outputLength + req.locals.output.length
	}

	if(req.locals.outputsString){
		outputLength = outputLength + req.locals.outputsString.length
	}

	if(req.body.n){
		outputLength = outputLength * req.body.n
	}

	// Cost in credits
	inputLength = Math.ceil(inputLength / 4)
	outputLength = Math.ceil(outputLength / 4)

	// Pricing for Davinci model
	let cost = 0.1200

	// Cost is per 1k tokens
	cost = cost / 1000

	// Credits used in a transaction
	let price = (inputLength + outputLength) * cost

	let creditsBeforeRounding = 12 * price
	let credits = Math.ceil(creditsBeforeRounding)

	req.locals.inputLength = inputLength
	req.locals.outputLength = outputLength
	req.locals.price = price
	req.locals.credits = credits

	// Now updated the suer

	let user = await User.findOne({ _id: req.user._id })

	user.credits = user.credits - credits
	user.creditsUsed = user.creditsUsed + credits

	req.user.credits = user.credits
	req.user.creditsUsed = user.creditsUsed

	// Attach credit data to request

	res._json = res.json
	res.json = function(data){
		data.credits = user.credits
		data.creditsUsed = user.creditsUsed
		res._json(data)
	}
	await user.save()

	next()
	
}


module.exports = creditPayment

