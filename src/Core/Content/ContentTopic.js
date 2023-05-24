import React, { Component } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import EntryInput from '../../Components/EntryInput' 
import Button from '../../Components/Button' 
import { CheckIcon,  } from '@heroicons/react/outline'
import { observer, inject,  } from 'mobx-react'
import { computed } from 'mobx'


// Learning to be a developer
// Development
// I cover how to become a better developer by learning new skills and techniques required to such as HTML, CSS, JS which all work towards creating improving.
// HTML, CSS, JS

// Getting Started With Storybook Without a JavaScript Framework
// JavaScript, Storybook
// We all want to use well-documented UI components in our Frontend. With Storybook, you can do that reasonably quickly with React, Angular, Vue, or any other framework.
// JavaScript, HTML & CSS, Storybook

@inject('store')
@observer
class ContentTopic extends Component {

	onClick = () => {
		this.props.store.editor.showInfo = !this.props.store.editor.showInfo
		console.log(this.props.store.editor.editor.view.dom.focus())
	}

	render() {

		const { 
			title, 
			audience, 
			desc, 
			keywords, 
			titleStatusColor, 
			audienceStatusColor, 
			descStatusColor, 
			keywordsStatusColor, 
			isEditingDisabled } = this.props.store.editor
		
		return (
			<div className={`bg-gray-150 border-b border-gray-200  overflow-hidden transition-all duration-500 ${this.props.store.editor.showInfo ? "max-h-0" : "max-h-full"}`}>
				<div className="container mx-auto max-w-3xl py-8 pb-12">

				<div className="text-4xl font-medium mb-4 text-gray-700 px-8">Prepare Document</div>
					<p className="text-gray-600 text-lg px-8">A <u>minimum required summary of content</u> is needed to start using the document editor. Please fill out the following sections which will help the content enhancer function well!</p>

					<div className=" relative z-10 rounded-tr-xl sm:rounded-t-xl lg:rounded-xl shadow-lg lg:-mr-8 sm:divide-y lg:divide-y-0 xl:divide-y divide-rose-100 flex flex-col mt-8">
						<section className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
							<div className="flex items-center w-full sm:w-48 lg:w-full xl:w-48 bg-gray-50 rounded-tr-xl sm:rounded-tr-none sm:rounded-tl-xl lg:rounded-tr-xl xl:rounded-tr-none text-lg leading-6 font-semibold text-rose-800 px-4 py-3 sm:p-8 lg:px-6 lg:py-4 xl:p-8">
								
								<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-8 md:w-8 h-4 w-4 rounded-full bg-${titleStatusColor}-300 sm:mx-0 sm:h-8 sm:w-8 bg-${titleStatusColor}-300 `}>
									
									<CheckIcon 
										className={`h-2 w-2 md:h-4 md:w-4
										text-${titleStatusColor}-700
									`} aria-hidden="true" />

								</div>
								<div className="ml-3">
								{title.name}
								</div>
							</div>
							<dl className="flex-auto bg-white sm:rounded-tr-xl lg:rounded-tr-none xl:rounded-tr-xl px-4 pb-4">
								<div className="space-y-1">
								<EntryInput prompt={title} />
								</div>
							</dl>
						</section>
						<section className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
							<div className="flex items-center  w-full sm:w-48 lg:w-full xl:w-48 bg-gray-50  bg-rose-50  text-lg leading-6 font-semibold text-rose-800 px-4 py-3 sm:p-8 lg:px-6 lg:py-4 xl:p-8">
								<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-8 md:w-8 h-4 w-4 rounded-full bg-${audienceStatusColor}-300 sm:mx-0 sm:h-8 sm:w-8 bg-${audienceStatusColor}-300 `}>
										
										<CheckIcon 
											className={`h-2 w-2 md:h-4 md:w-4
											text-${audienceStatusColor}-700
										`} aria-hidden="true" />

									</div>
									<div className="ml-3">
									{audience.name}
								</div>
							</div>
							<dl className="flex-auto bg-white sm:rounded-tr-xl lg:rounded-tr-none px-4 pb-4">
								<div className="space-y-1">
									<EntryInput prompt={audience} />
								</div>
							</dl>
						</section>
						<section className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
							<div className="flex items-center  w-full sm:w-48 lg:w-full xl:w-48 bg-gray-50  bg-rose-50  text-lg leading-6 font-semibold text-rose-800 px-4 py-3 sm:p-8 lg:px-6 lg:py-4 xl:p-8">
								<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-8 md:w-8 h-4 w-4 rounded-full bg-${descStatusColor}-300 sm:mx-0 sm:h-8 sm:w-8 bg-${descStatusColor}-300 `}>
										
										<CheckIcon 
											className={`h-2 w-2 md:h-4 md:w-4
											text-${descStatusColor}-700
										`} aria-hidden="true" />

									</div>
									<div className="ml-3">
									{desc.name}
								</div>
							</div>
							<dl className="flex-auto bg-white sm:rounded-tr-xl lg:rounded-tr-none  px-4 pb-4">
								<div className="space-y-1">
									<EntryInput prompt={desc} />
								</div>
							</dl>
						</section>
						<section className="flex flex-col sm:flex-row lg:flex-col xl:flex-row">
							<div className="flex items-center  w-full sm:w-48 lg:w-full xl:w-48 bg-gray-50  bg-rose-50  text-lg leading-6 font-semibold text-rose-800 px-4 py-3 sm:p-8 lg:px-6 lg:py-4 xl:p-8">
								<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-8 md:w-8 h-4 w-4 rounded-full bg-${keywordsStatusColor}-300 sm:mx-0 sm:h-8 sm:w-8 bg-${keywordsStatusColor}-300 `}>
										
										<CheckIcon 
											className={`h-2 w-2 md:h-4 md:w-4
											text-${keywordsStatusColor}-700
										`} aria-hidden="true" />

									</div>
									<div className="ml-3">
									{keywords.name}
								</div>
							</div>
							<dl className="flex-auto bg-white sm:rounded-tr-xl lg:rounded-tr-none xl:rounded-br-xl px-4 pb-4">
								<div className="space-y-1">
									<EntryInput prompt={keywords} />
								</div>
							</dl>
						</section>
					</div>

					<Button disabled={isEditingDisabled} onClick={this.onClick}>Start Editing Document</Button>
					
				</div>
			</div>
			
		)
	}
}


export default ContentTopic;