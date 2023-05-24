const models = require("../models")
const User = models.user;

const checkout = async (eventType,data) => {

	if (!eventType.includes("checkout")) {
		return // not a subscription event
	}

	console.log("checkout event detected",eventType)
	
	complete(eventType,data)
	// updated(reqBody)
	// deleted(reqBody)

}

const complete = async (eventType,data) => {

	if (!eventType.includes("checkout.session.completed")) {
		return // not a subscription event
	}
	const { object } = data
	console.log(`object.customer`,object.customer)
	console.log(`object.customer_email`,object.customer_email)

	await User
		.updateOne({ email: object.customer_email },
			{ customerId: object.customer })
		.exec()
}

module.exports = checkout