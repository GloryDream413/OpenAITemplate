import React, { Component } from 'react'
import { CheckIcon,  } from '@heroicons/react/outline'
import { observer, inject } from 'mobx-react'


@inject("store")
@observer
class EntryPrompt extends Component {
	render() {

		const { currentPrompt, disabled, index } = this.props 
		let hidden = currentPrompt === index ? false : true

		return (
			<div className={`align-bottom bg-white md:rounded-md text-left overflow-hidden transform transition-all sm:align-middle transition hover:shadow-md shadow-2xl focus:shadow-2xl md:mb-8  ${hidden ? "hidden" : ""}`}>

				<div className="px-6 py-6">

					<div className="flex items-center">

						<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 rounded-full bg-${!disabled ? "green" : "gray"}-300 sm:mx-0 sm:h-10 sm:w-10  ${!disabled ? "bg-green-300" : "bg-gray-300"} `}>
							
							<CheckIcon 
								className={`h-3 w-3 md:h-6 md:w-6 ${!disabled ? "text-green-700" : "text-gray-500"} text-${!disabled ? "green-700" : "gray-500"}`} aria-hidden="true" />

						</div>

						<div className="mt-0 ml-4 text-left">
							<div as="h3" className="text-lg leading-6 font-medium text-gray-900">

								{this.props.prompt.title || "Entry Text"}

							</div>

							<p className="text-sm text-gray-500">

								{this.props.prompt.desc || "Write a small bit of text"}

							</p>

						</div>

					</div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default EntryPrompt;