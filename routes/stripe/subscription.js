const models = require("../models")
const User = models.user;

const subscription = async (eventType,data) => {

	if (!eventType.includes("subscription")) {
		return // not a subscription event
	}

	console.log("subscription event detected",eventType)
	
	created(eventType,data)
	updated(eventType,data)
	deleted(eventType,data)

}

const created = async (eventType,data) => {

	if (!eventType.includes("subscription.created")) {
		return // not a subscription event
	}
	const { object } = data
	console.log(`object.status`,object.plan.status)
	console.log(`object.id`,object.id)
	console.log(`object.customer`,object.customer)
	console.log(`object.trial_end`,object.trial_end)
	console.log(`object.current_period_end`,object.current_period_end)
	console.log(`object.cancel_at_period_end`,object.cancel_at_period_end)

	await User
		.updateOne({ customerId: object.customer },
			{ 
				status: object.status,
				plan: object.items.data[0].plan.nickname,
				trial_end: object.trial_end,
				current_period_end: object.current_period_end,
				cancel_at_period_end: object.cancel_at_period_end,
			})
		.exec()
}

const updated = async (eventType,data) => {

	if (!eventType.includes("subscription.updated")) {
		return // not a subscription event
	}
	const { object } = data
	console.log(`object.status`,object.plan.status)
	console.log(`object.id`,object.id)
	console.log(`object.customer`,object.customer)
	console.log(`object.trial_end`,object.trial_end)
	console.log(`object.current_period_end`,object.current_period_end)
	console.log(`object.cancel_at_period_end`,object.cancel_at_period_end)
	

	await User
		.updateOne({ customerId: object.customer },
			{ 
				status: object.status,
				plan: object.items.data[0].plan.nickname,
				trial_end: object.trial_end,
				current_period_end: object.current_period_end,
				cancel_at_period_end: object.cancel_at_period_end,
			})
		.exec()
}

const deleted = async (eventType,data) => {

	if (!eventType.includes("subscription.deleted")) {
		return // not a subscription event
	}
	const { object } = data
	console.log(`object.status`,object.plan.status)
	console.log(`object.id`,object.id)
	console.log(`object.customer`,object.customer)
	console.log(`object.trial_end`,object.trial_end)
	console.log(`object.current_period_end`,object.current_period_end)
	console.log(`object.cancel_at_period_end`,object.cancel_at_period_end)
	
	await User
		.updateOne({ customerId: object.customer },
			{ 
				status: object.status,
				plan: "N/A",
				trial_end: object.trial_end,
				current_period_end: object.current_period_end,
				cancel_at_period_end: object.cancel_at_period_end,
		})
	.exec()
}


module.exports = subscription
