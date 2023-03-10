import React from 'react'
import { CheckIcon,  } from '@heroicons/react/outline'

export const EntryPromptOptions = ({ prompts, currentPrompt, onChange }) => {
	if(prompts.length === 1){
		return null
	}
	return (
	  <>
		<div className="select-none align-bottom text-left transform transition-all sm:align-middle transition  flex divide-x divide-gray-300 -mb-1">
		  {prompts.map((prompt, index) => (
			<div key={index} className={`shadow-md hover:relative hover:shadow-2xl  transition py-4 px-4 pr-8 rounded-t-md inline-flex text-${currentPrompt === index  ? "gray-800" : "gray-600 shadow-3xl"} font-medium border-b-2 border-${currentPrompt === index ? "white" : "gray-200"} bg-${currentPrompt === index ? "white" : "gray-300"} hover:bg-${currentPrompt === index  ? "white" : "gray-100"} cursor-pointer`} onClick={()=>onChange(index)}>
						  <div className={`transition mr-4  flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${currentPrompt === index ? "green-300" : "gray-200"} text-${currentPrompt === index ? "green" : "gray"}`}>
							  <CheckIcon className={`transition h-4 w-4 text-${currentPrompt === index ? "green-600" : "gray-400"}`} aria-hidden="true" />
						  </div>
						  {prompt.title}
				  </div>
		  	))}
			  </div>
	  </>
	)
}

export default EntryPromptOptions