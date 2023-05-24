import React, { Component } from 'react'
import { DatabaseIcon } from '@heroicons/react/outline'
import { observer, inject } from 'mobx-react'

@inject("store")
@observer
class EntryN extends Component {

	onChange = (e) => {
		
	}
	onChange = (e) => {
        let value = e.target.value
        if(value < 1){
            value = 1
        }
        if(value > 10){
            value = 10
        }
		this.props.prompts[this.props.currentPrompt].n = parseInt(value)
    }

	render() {

		const { prompts, currentPrompt } = this.props 

		return (
			<>
				{prompts[currentPrompt].n ? <div className="flex items-center relative mt-4">
						<label htmlFor="q" className="absolute inset-y-0 left-4 md:left-6 top-0 bottom-0 flex items-center text-gray-400 select-none pointer-events-none">
								<DatabaseIcon className="w-6 h-6" />
						</label>
                      <input 
                          name={"promptNumber"} 
                          id={"promptNumber"} 
                          type="number"
                          max={10}
                          min={1}
                          className="w-24 py-2 px-4 pl-10 pr-2 border rounded-md flex md:inline-flex font-medium text-lg cursor-pointer md:mx-0 hover:shadow-lg transition md:ml-4" 
                          value={prompts[currentPrompt].n} 
                          onChange={this.onChange} 
                        />
						<div className="px-4 text-sm flex-shrink-0 text-gray-500">Outputs</div>
						<div className="flex-1">
						
						</div>
				</div> : null}
			</>
		)
	}
}

export default EntryN;

