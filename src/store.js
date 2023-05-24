import axios from 'axios'
import { observable, computed, makeObservable } from 'mobx'
import { configure } from "mobx"
import FuzzySet from 'fuzzyset'
import Filter from 'bad-words'

import TOOLS from './tools'
import config from './config'


let filterBadWords = new Filter()

let baseURL = config.baseURL

configure({  enforceActions: "never", })

let api = axios.create({ baseURL, });

const FuzzySearch = FuzzySet([...TOOLS.map(tool => tool.title)]);

class appStore {

	api = api
	@observable baseURL = baseURL
	@observable redirect = ``
	@observable editor
	@observable editorIsLoading = true

	// User Profile
	@observable profile = {}
	@observable isLoggedIn = false
	@observable loginLoading = false
	
	@observable landingPageUrl = config.landingPageUrl
	
	editor

	constructor(){
		makeObservable(this);
		this.init()
		// Check credits every time, and log out people who aren't authenticated
		this.api.interceptors.response.use((response) => {
			this.updateCredits(response)
			return response;
		}, (error) => {
			console.log(error)
			console.log(`error.response.statusText`,error.response.statusText)
			if (error.response && error.response.statusText === "Token Authentication Failed") {
				this.handleLogout()
			}
			if (error.response && error.response.statusText === "No Credit Remaining") {
				this.noCreditsRemainPrompt()
			}
			return Promise.reject(error);
		});
		
	}

	noCreditsRemainPrompt = () => {
		// set the browser url to the no-credits page
		window.location.pathname = "/my-profile"
	}

	init = async () => {
		try {
			this.referralTrackingCode()
			const profile = localStorage.getItem("profile")
			const token = localStorage.getItem("token")
			if (profile && token) {
				this.api.defaults.headers.common['x-access-token'] = token;
				this.profile = JSON.parse(profile)
				this.isLoggedIn = true
				this.refreshTokenAndProfile()
			}
		} catch (err){
			console.log(err)
		}
	}

	@observable referral = ""

	referralTrackingCode = async () => {
		let referral = new URLSearchParams(window.location.search).get("referral")
		if(referral){
			this.setReferral(referral)
		} else {
			this.initReferral()
		}
	}

	setReferral = async (referral) => {
		this.referral = referral
		localStorage.setItem("referral", JSON.stringify(referral))
	}
	
	initReferral = async () => {
		const referral = localStorage.getItem("referral")
		this.referral = referral
	}

	
	loginWithDataTokenAndProfile = async (data) => {
		this.setToken(data.token)
		this.setProfile(data.profile)
		this.isLoggedIn = true
	}

	refreshTokenAndProfile = async () => {
		try {
			let data = await this.api
				.post('/user/refresh/profile')
				.then(({ data }) => data)
			if(data){
				this.setProfile(data.profile)
			}
		} catch (err) {
			console.log(err)
			this.handleLogout()
		}
	}

	setToken = async (token) => {
		this.api.defaults.headers.common['x-access-token'] = token;
		localStorage.setItem("token", token)
	}

	setProfile = async (profile) => {
		this.profile = profile
		localStorage.setItem("profile", JSON.stringify(profile))
	}

	handleLogout = () => {
		this.isLoggedIn = false
		this.profile = {}
		this.api.defaults.headers.common['x-access-token'] = ""
		localStorage.removeItem('token')
		localStorage.removeItem('profile')
	}

	@observable toolsKeyword = ""
	onChangeToolsKeyword = (e) => {
		this.toolsKeyword = e.target.value
	}
	@computed get tools() {
		// let tools = TOOLS.filter(tool => tool.title.toLowerCase().includes(this.toolsKeyword.toLowerCase()))
		let fuzzyTools = FuzzySearch.get(this.toolsKeyword, 0.5)
		if(fuzzyTools && fuzzyTools.length){
			let fuzzySummary = fuzzyTools.map(fuzzyTool => fuzzyTool[1])
			if(fuzzySummary && fuzzySummary.length) {
				return TOOLS.filter(tool => fuzzySummary.includes(tool.title))
			}
		}
		return TOOLS
	}

	getToolByTitle = (title) => {
		return TOOLS.find(tool => tool.title === title)
	}
	getToolByUrl = (url) => {
		return TOOLS.find(tool => tool.to === url)
	}

	@observable error = ""
	checkPrompt = ({value, attr}) => {
		if(filterBadWords.isProfane(value)){
			// eslint-disable-next-line no-throw-literal
			throw {
				success: false,
				attr,
				value: value.replace(/^\s+|\s+$/g, ''),
				message: "Unsafe content detected, please try different language"
			}
		}
		if(value){
			return {
				success: true,
				attr,
				value: value.replace(/^\s+|\s+$/g, ''),
			}
		}
	}
	checkOutput = (output) => {
		if(output){
			return output.replace(/^\s+|\s+$/g, '')
		}
		return ""
	}

	updateCredits = async (data) => {
		try {
			if(data.hasOwnProperty("data")){
				if(data.data.hasOwnProperty("credits")){
					this.profile.credits = data.data.credits
				}
				if(data.data.hasOwnProperty("creditsUsed")){
					this.profile.creditsUsed = data.data.creditsUsed
				}
			} else {
				if(data.hasOwnProperty("credits")){
					this.profile.credits = data.credits
				}
				if(data.hasOwnProperty("creditsUsed")){
					this.profile.creditsUsed = data.creditsUsed
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	@observable copyToClipboardText = ``
	copyToClipboard = (output) => {
		if (output instanceof Array) {
			output = output.join("\n")
		}
		if (!navigator.clipboard) {
			let textarea = document.getElementById('copy-textarea');
			this.copyToClipboardText = `${output}`;
			textarea.focus();
			textarea.select()
			document.execCommand('copy')
			return;
		}
		navigator.clipboard.writeText(output).then(function() {
			console.log('Async: Copying to clipboard was successful!');
		}, function(err) {
			console.error('Async: Could not copy text: ', err);
		});
	}

	@observable feedback = ``
	reportToFeedback = (output) => {
		this.redirect = "/my-profile/feedback"
		this.feedback = `${output}`
		setTimeout(()=>{ this.redirect = "" }, 50)
	}

	
}


export default appStore