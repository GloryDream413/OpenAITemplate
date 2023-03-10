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

@inject('store')
@observer
class ShowMenuButton extends Component {

	onClick = () => {
		const { store } = this.props
		store.editor.showInfo = !store.editor.showInfo
	}

	render() {
		const { showInfo } = this.props.store.editor

		return (
			<ToolTip className="inline-flex" title="Show Document Info">
				<button
					onClick={this.onClick}
					className={`rounded-md px-2 py-2 text-lg  transition ${showInfo ? 'hover:bg-gray-200 text-gray-400 hover:text-gray-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
				>
				<ChevronUpIcon className={`w-6 h-6 transition transform ${showInfo ? "" : "rotate-180"}`} />
				</button>
			</ToolTip>
		)
	}
}


export default ShowMenuButton