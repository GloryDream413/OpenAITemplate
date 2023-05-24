import React, { Component } from 'react'
import {
	SortAscendingIcon,
} from '@heroicons/react/solid'

import { observer, inject,  } from 'mobx-react'

@inject('store')
@observer
class ContentBubbleMenuRephrase extends Component {

	onClick = () => {
		const { store, from, to } = this.props
		const charactersSelected = to - from
		const enoughCharToWork = charactersSelected < 200
		if(enoughCharToWork){
			store.editor.editorBubbleMenu('/ai/content/shorten')
		}
	}

	render() {
		const {  from, to } = this.props
		const charactersSelected = to - from
		const enoughCharToWork = charactersSelected < 200

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
					'text-gray-600 hover:text-blue-800 hover:bg-blue-100' : 
					'bg-gray-100 text-gray-400 cursor-default'}
				hover:shadow-md
				hover:relative
				hover:z-10
				px-4 py-2`}
				>
				<SortAscendingIcon className="w-6 h-6 mr-2 text-blue-400" /> Shorten {enoughCharToWork ? `Text` : `${charactersSelected}/200`}
			</button>
		)
	}
}


export default ContentBubbleMenuRephrase