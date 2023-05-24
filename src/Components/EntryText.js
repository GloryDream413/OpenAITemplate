import React, { Component } from 'react'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class EntryText extends Component {
  render() {
    const { onChangePromptNumber, promptNumber, title, desc, prompt, onChange,active,
      //  getColor, 
       error, hidden, disabled, placeholder, children} = this.props
    return (
      <div className={`align-bottom bg-white md:rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:align-middle transition shadow-md hover:shadow-2xl focus:shadow-2xl mb-4 md:mb-8 ${hidden ? "hidden" : ""}`}>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center">
              <div className={`flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 rounded-full bg-${error ? "red" : prompt ? "green" : "gray"}-300 sm:mx-0 sm:h-10 sm:w-10 ${error ? "bg-red-300" : active ? "bg-green-300" : "bg-gray-300"}`}>
			              
                    {error ? 
                        <XIcon className={`h-6 w-6 text-red-600`} aria-hidden="true" />
                        :
                        <CheckIcon className={`h-3 w-3 md:h-6 md:w-6 ${active ? "text-green-700" : "text-gray-500"} text-${prompt ? "green-700" : "gray-500"}`} aria-hidden="true" />
                    }
                </div>
                <div className=" mt-0 ml-4 text-left">
                    <div as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    	{title || "Entry Text"}
                    </div>
                      <p className="text-sm text-gray-500">
                        {desc || "Write a short statement you wish to fix up."}
                      </p>
                    </div>
                  </div>
                 
                  
                    {children ? children : <div className="relative">
                      <div className={`text-gray-400 text-xs absolute top-0 right-1`}>
                            {prompt ? prompt.length : 0}/600 characters
                           
                        </div>
                        <textarea 
                          disabled={disabled}
                          maxLength={600}
                          className={`mt-6 focus:outline-none text-lg bg-white rounded-md px-4 py-4  min-w-full border border-gray-300 font-regular h-48 ${disabled ? "bg-gray-200 text-gray-500" : ""}`} 
                          onChange={onChange} 
                          value={prompt} 
                          placeholder={placeholder ? placeholder : "Enter some text to get started"}
                        />
                        
                    </div>}
                    {promptNumber ? <div className="flex items-center">
                      <input 
                          name={"promptNumber"} 
                          id={"promptNumber"} 
                          type="number"
                          max={10}
                          min={1}
                          className="w-20 text-center focus:outline-none text-sm bg-white rounded-md px-2 py-1 border border-gray-300 font-regular" 
                          value={promptNumber} 
                          onChange={onChangePromptNumber} 
                        />
                      <div className="px-4 text-sm flex-shrink-0 text-gray-500">Number of results and used credits.</div>
                      <div className="flex-1">
                       
                      </div>
                        </div> : null}
                    {error && <div className="text-xs text-red-600">{error}</div>}
                    </div>

                </div>
    )
  }
}






export const EntryMultiple = observer(({  title, desc, prompts, hidden, onChange, getColor, disabled }) => {
	return (
		<div className={`align-bottom bg-white md:rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:align-middle transition shadow-md hover:shadow-2xl focus:shadow-2xl mb-4 md:mb-8  ${hidden ? "hidden" : ""}`}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 rounded-full bg-${!disabled ? "green" : "gray"}-300 sm:mx-0 sm:h-10 sm:w-10  ${!disabled ? "bg-green-300" : "bg-gray-300"} `}>
            <CheckIcon className={`h-3 w-3 md:h-6 md:w-6 ${!disabled ? "text-green-700" : "text-gray-500"} text-${!disabled ? "green-700" : "gray-500"}`} aria-hidden="true" />
          </div>
        <div className="mt-0 ml-4 text-left">
            <div as="h3" className="text-lg leading-6 font-medium text-gray-900">
              {title || "Entry Text"}
            </div>
              <p className="text-sm text-gray-500">
                {desc || "Write a short statement you wish to fix up."}
              </p>
            </div>
          </div>
          {prompts ? prompts.map((prompt, index) => (<MultipleOption key={index} index={index} {...prompt} onChange={onChange} />)) : null}
        </div>
    </div>
	)
})

export const MultipleOption = observer(({ title, value, onChange, placeholder, examples, index, ...props }) => {
  return (
     <div className="mt-6">
          <label htmlFor={title} className="text-gray-600 font-medium text-md">{title}</label>
          {props.type === "textarea" ? <textarea 
            name={title} 
            id={title} 
            {...props}
            className="focus:outline-none text-lg bg-white rounded-md px-4 py-2  min-w-full border border-gray-300 font-regular mt-2" 
            value={value} 
            onChange={e=>onChange(e.target.value,index)} 
            placeholder={placeholder} /> : <input 
            name={title} 
            id={title} 
            {...props}
            className="focus:outline-none text-lg bg-white rounded-md px-4 py-2  min-w-full border border-gray-300 font-regular mt-2" 
            value={value} 
            onChange={e=>onChange(e.target.value,index)} 
            placeholder={placeholder}  />}
          {examples && <label htmlFor={title} className="text-gray-400 text-xs">{examples}</label>}
        </div>
    )
})

export const EntryPromptOptions = ({ promptOptions, currentPromptOption, onChange }) => {
  return (
    <div className="align-bottom text-left transform transition-all sm:align-middle transition  flex divide-x divide-gray-300 -mb-1">
        {promptOptions.map((promptOption, index) => (
          <div key={index} className={`shadow-md hover:relative hover:shadow-2xl  transition py-4 px-4 pr-8 rounded-t-md inline-flex text-${currentPromptOption === promptOption  ? "gray-800" : "gray-600 shadow-3xl"} font-medium border-b-2 border-${currentPromptOption === promptOption ? "white" : "gray-200"} bg-${currentPromptOption === promptOption ? "white" : "gray-300"} hover:bg-${currentPromptOption === promptOption  ? "white" : "gray-100"} cursor-pointer`} onClick={()=>onChange(promptOption)}>
						<div className={`transition mr-4  flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${currentPromptOption === promptOption ? "green-300" : "gray-200"} text-${currentPromptOption === promptOption ? "green" : "gray"}`}>
							<CheckIcon className={`transition h-4 w-4 text-${currentPromptOption === promptOption ? "green-600" : "gray-400"}`} aria-hidden="true" />
						</div>
						{promptOption}
				</div>
        ))}
			</div>
  )
}

export const Option = ({ title, desc, active , onClick, Icon}) => <div className={`flex items-center font-medium py-1 px-2 hover:bg-${active ? "green" : "gray"}-200 bg-${active ? "green" : "na"}-100 rounded-md cursor-pointer`} onClick={onClick}>
<div className={`flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-${active ? "green" : "gray"}-300 mr-4`}>
    {Icon ? 
      <Icon className={`h-4 w-4 text-${active ? "green" : "gray"}-600`} aria-hidden="true" /> : 
      <CheckIcon className={`h-4 w-4 text-${active ? "green" : "gray"}-600`} aria-hidden="true" />}
</div>
<div>
{title}
<div className="font-normal text-sm">{desc}</div>
</div>
</div>

export default EntryText;