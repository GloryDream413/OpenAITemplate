import React, { Component } from 'react'
import {
	SortAscendingIcon,
} from '@heroicons/react/solid'

import { observer, inject,  } from 'mobx-react'
import {
	LightBulbIcon,
	ChevronUpIcon
  } from '@heroicons/react/solid'

  import ToolTip from '../../../Components/ToolTip'
  import Countdown from 'react-countdown';

  import Loader from '../../../Components/Loader'

@inject('store')
@observer
class ShowMenuButton extends Component {

	onClick = () => {
		const { store } = this.props
		store.editor.showInfo = !store.editor.showInfo
	}

	render() {
		const { store } = this.props
		const { editorAiEnabled, charactersModified, bubbleMenuLoading } = this.props
		
		return (
			<>
			<Countdown 
				ref={countdown => store.editor.editorMenuCountdown = countdown} 
				date={store.editor.editorMenuCountdownDate} 
				renderer={props => 
				<ToolTip className="inline-flex" title={`Generate content using AI`}>
					<button
						onClick={() => store.editor.writeForMe()}
						className={`text-sm font-medium flex items-center rounded-md px-2 py-2 transition ${!props.total && editorAiEnabled && !bubbleMenuLoading ? 'bg-green-500 text-white  hover:bg-green-600 ' : 'bg-gray-300 text-white hover:bg-gray-300 cursor-default'}`}
					>
						{bubbleMenuLoading ?  
						<Loader active className="w-6 h-6 mr-2" /> 
							: 		
						<LightBulbIcon className="w-6 h-6 mr-2" />}
						<span className="mr-2">{props.total ? `Wait ${props.total/1000}s` : editorAiEnabled ? "Write" : `Write ${charactersModified}/${store.editor.charactersModifiedMinimum}`}</span>
					</button>
				</ToolTip>} 
			/> 
			</>
		)
	}
}


export default ShowMenuButton