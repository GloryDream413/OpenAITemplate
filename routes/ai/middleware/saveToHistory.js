const db = require("../../models");
const History = db.history;

const saveToHistory = async (req, res, next) => {

	let prepHistory = {}


	if(req.body.n){
		prepHistory.n = req.body.n
	}

	if(req.locals.input){
		prepHistory.input = req.locals.input
	}
	if(req.locals.inputRaw){
		prepHistory.input = req.locals.inputRaw
	}
	if(req.locals.output){
		prepHistory.output = req.locals.output
	}
	if(req.locals.outputs){
		prepHistory.outputs = req.locals.outputs
	}
	if(req.locals.inputLength){
		prepHistory.inputLength = req.locals.inputLength
	}
	if(req.locals.outputLength){
		prepHistory.outputLength = req.locals.outputLength
	}
	if(req.locals.price){
		prepHistory.price = req.locals.price
	}
	if(req.locals.credits){
		prepHistory.credits = req.locals.credits
	}
	if(req.user._id){
		prepHistory.user = req.user._id
	}

	if(req.url){
		prepHistory.api = req.originalUrl
		prepHistory.url = req.originalUrl
	}

	let history = new History(prepHistory)
	history.save();

	next()
}

module.exports = saveToHistory