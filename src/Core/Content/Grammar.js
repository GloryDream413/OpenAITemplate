import React, { Component } from 'react'
import {
	PencilAltIcon,
} from '@heroicons/react/solid'

import { observer, inject,  } from 'mobx-react'

@inject('store')
@observer
class ContentBubbleMenuGrammar extends Component {

	onClick = () => {
		const { store, from, to } = this.props
		const charactersSelected = to - from
		const enoughCharToWork = charactersSelected < 600
		if(enoughCharToWork){
			store.editor.editorBubbleMenu('/ai/content/grammar')
		}
	}

	render() {
		const { from, to } = this.props
		const charactersSelected = to - from
		const enoughCharToWork = charactersSelected < 600

		if(charactersSelected < 20){
			return null
		}
		
		if(charactersSelected > 900){
			return null
		}
		return (
			<button
				onClick={this.onClick}
				className={`flex 
				transition 
				font-medium
				${enoughCharToWork ? 
					'text-gray-600 hover:text-green-800 hover:bg-green-100' : 
					'bg-gray-100 text-gray-400 cursor-default'}
				hover:shadow-md
				hover:relative
				hover:z-10
				px-4 py-2`}
				>
				<PencilAltIcon className="w-6 h-6 mr-2 text-green-400" />{enoughCharToWork ? `Fix Grammar ` : `Grammar ${charactersSelected}/600`}
			</button>
		)
	}
}


export default ContentBubbleMenuGrammar