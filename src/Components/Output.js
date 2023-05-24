import Loader from './Loader'
import Typist from 'react-typist';
import {  CheckIcon,
} from '@heroicons/react/solid'
import {   DuplicateIcon, ExclamationCircleIcon
} from '@heroicons/react/outline'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import CodeEditor from "@uiw/react-textarea-code-editor";


export const Output = inject('store')(observer(({ store,title, desc, Icon, output, code, language, outputs, loading, children, fromColor, toColor, outputsColor, OutputsIcon}) => {
	return (<div className="relative mb-12"><div className={`absolute inset-0 bg-gradient-to-r from-${fromColor ? fromColor : "green-400"} to-${toColor ? toColor : "blue-500"} shadow-lg transform md:skew-y-0 md:-rotate-3 md:rounded-3xl -mt-1 md:mt-0`}></div>
	<div className=" align-bottom bg-white md:rounded-3xl text-left  shadow-xl transform transition-all sm:align-middle transition shadow-md hover:shadow-2xl focus:shadow-2xl">

	<div className=" px-6 py-6">
	<div className="sm:flex sm:items-start">
	{loading ? <>
			<Loader active={loading} className="w-10 h-10"  />
			</> : <>
			<div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${output ? "green" : "gray"}-300 sm:mx-0 sm:h-10 sm:w-10 bg-gradient-to-r from-${fromColor ? fromColor : "green-400"} to-${toColor ? toColor : "blue-500"}`}>
				{Icon ? <Icon className={`h-6 w-6 text-white`} aria-hidden="true" /> : null}
			</div>
			</>}

			<div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
				<div as="h3" className="text-lg leading-6 font-medium text-gray-900">
				{title}
				</div>
					<p className="text-sm text-gray-500">
					{desc}
					</p>
				</div>
		
		</div>
		{code ? null : output ? <div
			className="whitespace-pre-wrap min-w-full text-gray-800 h-auto text-lg divide-y px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				{output ? 
					<Typist
						stdTypingDelay={0}
						avgTypingDelay={7}
						cursor={{
							show: true,
							blink: true,
							element: '|',
							hideWhenDone: true,
							hideWhenDoneDelay: 250,
						}}
						>
							{output}
						</Typist> 
					: null}
				
			
			</div> : null}

			{(output && outputs && outputs.length) ? <div className="divide-y divide-dashed divide-gray-300"> <div></div>
<div></div></div> : null}
			
			{(outputs && outputs.length) ?
				<Outputs outputs={outputs} outputsColor={outputsColor} OutputsIcon={OutputsIcon} /> : null}

			{(code && code.length) ?
				<CodeEditor
					style={{
						fontFamily: 'JetBrains Mono',
						fontSize: "1rem",
					}}
					padding={30}
					language={language}
					value={code}
					/> : null}
			<QuickTools outputs={outputs} output={output} code={code} />
		
		</div>
	</div>
	
</div>)
}))



export const QuickTools = inject('store')(observer(({ store, output, outputs, code }) => {
	return (
		<>
{(output || code || (outputs && outputs.length)) ? <div className="flex">
			
			<Shortcut className="p-1 rounded-lg cursor-pointer hover:bg-green-200 hover:text-green-700 relative group flex flex-col items-center group text-gray-300"
			onClick={()=>store.copyToClipboard(output || code || outputs)}
			>
				<DuplicateIcon className="w-5 h-5" />
				<Tooltip className="absolute bottom-2 flex flex-col items-center mb-6 group-hover:flex">
					<span className="relative z-10 p-3 text-sm leading-none text-gray-800 bg-white bg-opacity-25 shadow-lg text-center backdrop-filter backdrop-blur rounded-md">Copy text to clipboard</span>
				</Tooltip>
			</Shortcut>
			<div className="flex-1"></div>
			<Shortcut className="p-1 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-700 relative group flex flex-col items-center group text-gray-300" onClick={()=>store.reportToFeedback(output || code || outputs)}>
				<ExclamationCircleIcon className="w-5 h-5" />
				<Tooltip className="absolute bottom-2 flex flex-col items-center mb-6 group-hover:flex">
					<span className="relative z-10 p-3 text-sm leading-none text-gray-800 bg-white bg-opacity-25 shadow-lg text-center backdrop-filter backdrop-blur rounded-md">Report issue with output</span>
				</Tooltip>
			</Shortcut>
		</div> : null}
		</>
	)
}))

const Tooltip = styled.div`
	display:none;
	white-space: nowrap;
`

const Shortcut = styled.div`
	&:hover ${Tooltip} {
		display: flex;
	}
`



function Outputs({ outputs, outputsColor, OutputsIcon }){
	
	return(
	<div className="whitespace-pre-wrap min-w-full py-4 text-gray-800 h-auto text-lg divide-y">
		<Typist
		stdTypingDelay={0}
		avgTypingDelay={7}
		className="divide-y"
		cursor={{
			show: false,
			blink: false,
			element: '|',
			hideWhenDone: true,
			hideWhenDoneDelay: 250,
		}}
		>
		
			{outputs.map((output, index) => 
				<div className="py-2 flex items-start" key={index}>
				<div className={`mr-4 flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${outputsColor ? outputsColor : "green"}-200 text-${outputsColor ? outputsColor : "green"}-600`}>
					{OutputsIcon === false ? 
						`${(index+1)}` : 
						OutputsIcon ? <OutputsIcon className={`h-4 w-4 text-${outputsColor ? outputsColor : "green"}-600`} aria-hidden="true" /> :
							<CheckIcon className={`h-4 w-4 text-${outputsColor ? outputsColor : "green"}-600`} aria-hidden="true" />}
				</div>
				{output}
			</div>)}
			
		</Typist> 

	</div>
	)
}


export default Output