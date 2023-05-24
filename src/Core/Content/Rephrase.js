import React, { Component } from 'react'
import {
	RefreshIcon,
} from '@heroicons/react/solid'

import { observer, inject,  } from 'mobx-react'

@inject('store')
@observer
class ContentBubbleMenuRephrase extends Component {

	onClick = () => {
		const { store, from, to } = this.props
		const charactersSelected = to - from
		const enoughCharToWork = charactersSelected < 150
		if(enoughCharToWork){
			store.editor.editorBubbleMenu('/ai/content/rephrase')
		}
	}

	render() {
		const {  from, to } = this.props
		const charactersSelected = to - from
		const enoughCharToWork = charactersSelected < 150

		if(charactersSelected < 20){
			return null
		}

		if(charactersSelected > 300){
			return null
		}
		return (
			<button
				onClick={this.onClick}
				className={`flex 
				transition 
				font-medium
				${enoughCharToWork ? 
					'text-gray-600 hover:text-yellow-800 hover:bg-yellow-100' : 
					'bg-gray-100 text-gray-400 cursor-default'}
				hover:shadow-md
				hover:relative
				hover:z-10
				px-4 py-2`}
				>
				<RefreshIcon className="w-6 h-6 mr-2 text-yellow-400" /> Rephrase {enoughCharToWork ? `Sentence` : `${charactersSelected}/150`}
			</button>
		)
	}
}


export default ContentBubbleMenuRephrase