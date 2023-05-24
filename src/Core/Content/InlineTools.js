import React, { Component } from 'react'
import { observer, inject,  } from 'mobx-react'
import Countdown from 'react-countdown';
import Loader from '../../Components/Loader'

import Rephrase from './Rephrase'
import Grammar from './Grammar'
import Shorten from './Shorten'

@inject('store')
@observer
class InlineTools extends Component {

	onClick = () => {
		const { store } = this.props
		store.editor.showInfo = !store.editor.showInfo
	}

	render() {
		const { store } = this.props
		const { editor  } = this.props
		const { bubbleMenuLoading } = store.editor
		
		return (
			<>
			<Countdown 
				ref={countdown => store.editor.editorMenuCountdown = countdown} 
				date={store.editor.editorMenuCountdownDate} 
				renderer={props => <div>
					<div className="border border-gray-300 rounded-lg  bg-white bg-opacity-60 backdrop-filter flex flex-col md:flex-row overflow-hidden backdrop-blur-md  divide-x text-gray-600 mb-1">
					{(bubbleMenuLoading || props.total) ? <div className="px-4 py-2 transition flex justify-center text-medium bg-gray-800 text-white">
						<Loader active className="w-6 h-6 mr-4" /> {bubbleMenuLoading}{props.total && `Wait ${props.total/1000}s`}
					</div> : <>
					<Grammar
						from={editor.state.selection.from}
						to={editor.state.selection.to}
					/>
					<Rephrase
						from={editor.state.selection.from}
						to={editor.state.selection.to}
					/>
					<Shorten 
						from={editor.state.selection.from}
						to={editor.state.selection.to}
					/>
					</>}
					</div>
					</div>}
					/>
			</>
		)
	}
}


export default InlineTools

