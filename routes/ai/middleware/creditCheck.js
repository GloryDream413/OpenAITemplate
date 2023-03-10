const db = require("../../models");
const User = db.user;

const creditCheck = async (req, res, next) => {

	let user = await User.findOne({ _id: req.user._id })

	if(user.credits > 0){
		next()
	} else {
		// res.statusMessage = 'No Credit Remaining';
		// res.sendStatus(401)
		res.json({
			success: false,
			credits: 0,
			error: "No Credits",
			message: "No Credits left, please recharge your account on the profile page"
		})
		return
	}
}


module.exports = creditCheck