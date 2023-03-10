const creditCheck = require('./creditCheck');
const contentFilterCheck = require('./contentFilterCheck');
const sendResponse = require('./sendResponse');
const creditPayment = require('./creditPayment');
const saveToHistory = require('./saveToHistory');

const initMiddleware = async (req, res, next) => {
	req.locals = {}

	// Ensure N (number of generations) is no less than 1 or more than 10 
	// Number of credits to be used
	let { n } = req.body
	if(!n){
		n = 1
	} else {
		if(n > 10) {
			n = 10
		}
		if(n < 1) {
			n = 1
		}
		n = Math.round(n)
	}
	req.body.n = n
	next()
}

const checks = {
	initMiddleware,
	contentFilterCheck,
	sendResponse,
	creditCheck,
	creditPayment,
	saveToHistory,
}

module.exports = checks;