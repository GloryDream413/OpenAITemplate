import { observable, computed, makeObservable } from 'mobx'
import { configure } from "mobx"


class editorStore {

	store

	@observable showInfo = false
	@observable title = {
		name: "Title",
		attr: "title",
		value: "", //Getting Started With Storybook Without a JavaScript Framework
		desc: "",
		type: "text",
		required: true,
		min: 5,
		maxLength: 150,
		label: "The title you were planning to give the article.",
		placeholder: "The Subject"
	}

	@observable audience = {
		name: "Audience",
		attr: "audience",
		value: "", //Developers, Programmers
		desc: "",
		type: "text",
		required: true,
		min: 5,
		maxLength: 50,
		label: "What the main category of article you are writing about",
		placeholder: "Technology, development, etc"
	}

	@observable desc = {
		name: "Description",
		attr: "description",
		value: "", //An article about why its important to use storybook to document your progress even when working without a javascript framework to help you understand what you are doing.
		desc: "",
		type: "textarea",
		required: true,
		min: 100,
		maxLength: 600,
		label: "A short description of what the article will be about",
		placeholder: "An article about how to start coding..."
	}

	@observable keywords = {
		name: "Keywords",
		attr: "keywords",
		value: "", // JavaScript, HTML & CSS, Storybook
		desc: "",
		type: "text",
		required: true,
		min: 4,
		maxLength: 100,
		label: "A short description of what the article will be about",
		placeholder: "Coding, development, html, css, js"
	}

	@computed get titleStatusColor(){
		const { title } = this
		if(title.value.length === 0){
			return "gray"
		}
		if(title.min > title.value.length){
			return "red"
		}
		return "green"
	}

	@computed get audienceStatusColor(){
		const { audience } = this
		if(audience.value.length === 0){
			return "gray"
		}
		if(audience.min > audience.value.length){
			return "red"
		}
		return "green"
	}

	@computed get descStatusColor(){
		const { desc } = this
		if(desc.value.length === 0){
			return "gray"
		}
		if(desc.min > desc.value.length){
			return "red"
		}
		return "green"
	}


	@computed get keywordsStatusColor(){
		const { keywords } = this
		if(keywords.value.length === 0){
			return "gray"
		}
		if(keywords.min > keywords.value.length){
			return "red"
		}
		return "green"
	}


	@computed get isEditingDisabled(){
		if(this.titleStatusColor !== "green"){
			return true
		}
		if(this.audienceStatusColor !== "green"){
			return true
		}
		if(this.descStatusColor !== "green"){
			return true
		}
		if(this.keywordsStatusColor !== "green"){
			return true
		}
		return false
	}




	constructor(store){
		this.store = store
		makeObservable(this);
	}

	createEditor = (editor) => {
		this.editor = editor
		console.log(editor)
		this.editorIsLoading = false
	}

	editorPreEditLoading = async (tool) => {
		this.editor.options.editable = false
		this.editorMenuCountdownDate = Date.now() + 12000
		if(this.editorMenuCountdown){
			this.editorMenuCountdown.stop()
			this.editorMenuCountdown.start()
		}
		this.editor.options.editorProps.attributes.class = "flex-grow mt-8 border border-gray-200 text-gray-500 focus:outline-none"
		this.editor.commands.blur()
		this.bubbleMenuLoading = `${tool.title}`
	}

	editorPostEditLoadingFinished = async () => {
		this.bubbleMenuLoading = ""
		this.editor.options.editable = true
		this.editor.options.editorProps.attributes.class = "flex-grow mt-8 border focus:outline-none"
		this.editor.commands.focus()
		this.charactersModified = 0
	}

	@computed get isCountdownActive(){
		return this.editorMenuCountdownDate > Date.now() ? true : false
	}

	

	editorGetSelectedText = async () => {
		const { state } = this.editor
		const { from, to } = state.selection
		let text = await this.generateText(from, to, ' ')
		return text
	}

	@observable bubbleMenuLoading = ""

	

	editorBubbleMenu = async (toolName) => {
		try {
			let tool = this.store.getToolByUrl(toolName)
			this.editorPreEditLoading(tool)
			let content = await this.editorGetSelectedText()
			console.log(content)
			let output = await this.store.api.post(tool.api, { content })
			if(output.data.output){
				this.editor.chain().focus().command(({ tr }) => tr.insertText(output.data.output)).run()
			}
			this.editorPostEditLoadingFinished()
		} catch (err){
			console.log(err)
			this.editorPostEditLoadingFinished()
		}
	}

	@observable charactersModified = 0
	@observable characterCount = 0
	@observable editorHtml = ""

	characterCounter = async (characterCount) => {
		if(characterCount !== this.characterCount){
			this.charactersModified += Math.abs(characterCount - this.characterCount)
			this.characterCount = characterCount
		}
	}

	charactersModifiedMinimum = 120

	@computed get editorAiEnabled(){
		// return true
		// if(this.characterCount < 160){
		// 	return false
		// }
		if(this.charactersModified < this.charactersModifiedMinimum){
			return false
		}
		return true
	}

	@observable editorMenuCountdownDate = Date.now() + 1000
	editorMenuCountdown

	generateText = (fromChar, toChar) => {
		let text = '';
		let separated = true;
		fromChar = fromChar || 0;
		toChar =  toChar || 0;
		// console.log(`toChar`,toChar)
		// console.log(this.editor.state.doc.content.size)
		const blockSeparator = '\n';
		const leafText = null;

		// document.querySelector('#tiptap-root').innerText
		// Get all text in proper format up to this point
	  
		this.editor.state.doc.nodesBetween(fromChar, toChar, (node, pos) => {
		  const textSerializer = this.editor.extensionManager.textSerializers[node.type.name]
		//   console.log(textSerializer,node.toJSON())
		  if (textSerializer) {
			text += textSerializer({ node })
			separated = !blockSeparator
			
		  } else if (node.isText) {
			text += node.text.slice(Math.max(fromChar, pos) - pos, toChar - pos)
			text += blockSeparator
			separated = !blockSeparator
		  } else if (node.isLeaf && leafText) {
			text += leafText
			separated = !blockSeparator
		  } else if (!separated && node.isBlock) {
			text += blockSeparator
			separated = true
		  } else if (!separated && node.isBlock) {
			text += blockSeparator
			separated = true
		  }
		  if(node.type.name === "heading"){
			text += '#'.repeat(node.toJSON().attrs.level)
			text += " "
		  }
		}, 0)
		console.log(`text`,text)
		return text;
	}

	

	writeIntro = async () => {
		try {
			this.editorPreEditLoading({ title: "Generating Introduction..."})
			const { state } = this.editor;
			const { from } = state.selection
			let output = await this.store.api.post(`/ai/writing/intro`, { 
				title: this.title.value,
				desc: this.desc.value,
				audience: this.audience.value,
				keywords: this.keywords.value,
			})
			
			let totalLength = 0
			output.data.output = output.data.output.replace(/\n/g, '</div><div>')
			// output.data.output += '</div>'
			let outputs = output.data.output.split(' ')
			if(output.data.output){
				for (let timeoutIndex = 0; timeoutIndex < outputs.length; timeoutIndex++) {
					totalLength++
					setTimeout(()=> {
						
						this.editor.commands.insertContent(`${outputs[timeoutIndex]} `)
					}, 21 * totalLength)
				}
			}
			totalLength++
			setTimeout(()=> {
				this.editorPostEditLoadingFinished()
			}, 21 * totalLength)
		} catch (err){
			console.log(err)
		}
	}

	writeIntroOutline = async () => {
		try {
			this.editorPreEditLoading({ title: "Generating Outline..."})
			const { state } = this.editor;
			const { from } = state.selection
			let res = await this.store.api.post(`/ai/writing/outline`, { 
				title: this.title.value,
				desc: this.desc.value,
				audience: this.audience.value,
				keywords: this.keywords.value,
			})

			let output = []
			for (let i = 0; i < res.data.outputs.length; i++) {
				output.push(`${i+1}. ${res.data.outputs[i]}<br/>`)
			}
			let totalLength = 0
			if(output){
				for (let timeoutIndex = 0; timeoutIndex < output.length; timeoutIndex++) {
					totalLength++
					setTimeout(()=> {
						this.editor.commands.insertContent(`${output[timeoutIndex]}`)
					}, 21 * totalLength)
				}
			}
			totalLength++
			setTimeout(()=> {
				this.editorPostEditLoadingFinished()
			}, 21 * totalLength)
		} catch (err){
			console.log(err)
		}
	}


	writeForMe = async () => {
		try {

			this.editorPreEditLoading({ title: "Generating Content..."})

			const { state } = this.editor;
			const { from } = state.selection

			let content = await this.generateText(null,from)
			console.log({
				content
			})
			// let output = await this.store.api.post(`/ai/writing/write`, { 
			// 	content,
			// 	title: this.title.value,
			// 	desc: this.desc.value,
			// 	audience: this.audience.value,
			// 	keywords: this.keywords.value,
			//  })
			let output = {
				data: {
					output: "Yes this worked"
				}
			}
			let totalLength = 0
		
			output.data.output = output.data.output.replace(/\n/g, '<br>')
			let outputs = output.data.output.split(' ')
			if(output.data.output){
				for (let timeoutIndex = 0; timeoutIndex < outputs.length; timeoutIndex++) {
					totalLength++
					setTimeout(()=> {
						this.editor.commands.insertContent(`${outputs[timeoutIndex]} `)
					}, 21 * totalLength)
				}
			}

			totalLength++
			setTimeout(()=> {
				this.editorPostEditLoadingFinished()
			}, 21 * totalLength)
			
		} catch (err){
			console.log(err)
			this.editorPostEditLoadingFinished()
		}
	}

}

export default editorStore