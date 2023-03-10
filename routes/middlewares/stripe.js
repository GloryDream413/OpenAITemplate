require('dotenv-flow').config();

const stripe = require('stripe')(process.env.STRIPE_SK);

module.exports = stripe