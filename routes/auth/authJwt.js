const db = require('../models');
const jwt = require('jsonwebtoken');
const User = db.user;

// route middleware to verify a token
const verifyToken = (req, res, next) => {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, req.app.get('jwt'), function(err, decoded) {      
			if (err) {
				res.statusMessage = "Token Authentication Failed";
				res.sendStatus(401)
			} else {
				req.user = decoded;    
				next();
			}
		});
	} else {
		res.sendStatus(403).json()
	}
}

const isAdmin = (req, res, next) => {
	User.findById(req.user._id).exec((err, user) => {
	  if (err) {
		res.status(500).send({ message: err });
		return;
	  }
	  if (user.accountType === 'admin') {
		next();
	  } else {
		res.status(403).send({ message: 'You are not an admin' });
	  }
	});
};


const authJwt = {
	// createJwtToken,
	verifyToken,
	isAdmin,
};
module.exports = authJwt;