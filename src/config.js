const dev = {
	baseURL: "http://65.21.236.218:3080/api/",
	landingPageUrl: "http://65.21.236.218:3080",
	stripe: {
		free: "price_1JcQD6HIZYvvnKladKayEvOZ",
		entry: "price_1JL68HHIZYvvnKlaBJWS5uDe",
		pro: "price_1JLQhlHIZYvvnKlakrqF8khB"
	},
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
	stripe: {
		free: "price_1JcQsUHIZYvvnKlaEPy958NF",
		entry: "price_1JLpWpHIZYvvnKlaHxiCr7Js",
		pro: "price_1JLpWxHIZYvvnKlamATZ7Awm"
	},
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;