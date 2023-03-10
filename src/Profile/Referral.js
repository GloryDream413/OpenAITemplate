import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { DatabaseIcon, LinkIcon, ArrowDownIcon, UsersIcon } from '@heroicons/react/outline'
import TwitterIcon from '../media/twitter'
import FacebookIcon from '../media/facebook'

@inject('store')
@observer
class Referral extends Component {

	value = `${window.store.landingPageUrl}/signup?referral=${this.props.store.profile.referralId}`
	render() {
		return (
			<>

<div className={`align-bottom bg-white md:rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:align-middle transition shadow-md hover:shadow-2xl focus:shadow-2xl mb-4 md:mb-8 `}>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

				 <h2 className="text-4xl ">Referral Program</h2>
				 <h2 className="text-gray-500 mb-8">You can earn additional credits by referring people to the site!</h2>

			 	 <div className="flex items-center">
					<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10`}>
						<DatabaseIcon className={`h-3 w-3 md:h-6 md:w-6 text-yellow-700 `} aria-hidden="true" />
					</div>
              	  <div className=" mt-0 ml-4 text-left">
                    <div as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    	Earn 100 credits!
                    </div>
                      <p className="text-sm text-gray-500">
                        When people sign up using your referral link below, you'll earn 100 credits.
                      </p>
                    </div>
                  </div>

				  <div className="flex items-center">
					<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 sm:mx-0 sm:h-10 sm:w-10`}>
						<ArrowDownIcon className={`h-3 w-3 md:h-6 md:w-6 text-gray-400 `} aria-hidden="true" />
					</div>
                  </div>
				  
                <div className="flex items-center">
					<div className={`flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 rounded-full bg-green-200 sm:mx-0 sm:h-10 sm:w-10`}>
						<UsersIcon className={`h-3 w-3 md:h-6 md:w-6 text-green-700 `} aria-hidden="true" />
					</div>
              	  <div className=" mt-0 ml-4 text-left">
                    <div as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    	Share your referral link
                    </div>
                      <p className="text-sm text-gray-500">
                        Use the link to share on social media and earn credits!
                      </p>
                    </div>
                  </div>

				  <div className="flex mt-4 mb-4">
				 		<div className="mt-1 flex rounded-md flex-1">
                       
                        <input
                          id="referral"
                          type="text"
						  value={this.value}
                          className="focus:ring-indigo-500 border focus:border-indigo-500 flex-1 rounded border-gray-300 py-3 px-6 flex-1 bg-gray-100 hover:bg-gray-200"
                          placeholder="www.example.com"
						  onChange={()=>{}}
						  onClick={()=>{
							document.getElementById("referral").select();  
							  this.props.store.copyToClipboard(`${window.store.landingPageUrl}/signup?referral=${this.props.store.profile.referralId}`
							)}}
                        />
                      </div>

					  

					{/* <input 
						type="url"
						value={`https://app.subwriter.ai/signup?ref=123123`}
						className="focus:outline-none text-lg bg-white rounded-md px-4 py-2 border border-gray-300 font-regular flex-1" /> */}
				  </div>

				 <div className="grid grid-cols-12">
					<div className="flex items-center" onClick={()=>this.props.store.copyToClipboard(`${window.store.landingPageUrl}/signup?referral=${this.props.store.profile.referralId}`)}>
							<div className={`cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 flex-shrink-0 inline-flex items-center justify-center md:h-16 md:w-16 h-6 w-6 rounded-full  sm:mx-0 sm:h-12 sm:w-12`}>
								<LinkIcon className={`h-3 w-3 md:h-8 md:w-8  `} aria-hidden="true" />
							</div>
					</div>

					{/* // eslint-disable-next-line react/jsx-no-target-blank */}
					<a rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?text=Check out OpenAI Template and give it a try with the following link: ${window.store.landingPageUrl}/signup?referral=${this.props.store.profile.referralId}`} className="flex items-center" target="_blank">
							<div className={`cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 flex-shrink-0 inline-flex items-center justify-center md:h-16 md:w-16 h-6 w-6 rounded-full  sm:mx-0 sm:h-12 sm:w-12`}>
								<TwitterIcon className={`h-3 w-3 md:h-8 md:w-8`} aria-hidden="true" />
							</div>
					</a>

					<a rel="noopener noreferrer" href={`https://www.facebook.com/sharer.php?u=${window.store.landingPageUrl}/signup?referral=${this.props.store.profile.referralId}`} className="flex items-center" target="_blank">
							<div className={`cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 flex-shrink-0 inline-flex items-center justify-center md:h-16 md:w-16 h-6 w-6 rounded-full  sm:mx-0 sm:h-12 sm:w-12`}>
								<FacebookIcon className={`h-3 w-3 md:h-8 md:w-8`} aria-hidden="true" />
							</div>
					</a>
				</div>
				

				</div>

                </div>
			
			</>
		)
	}
}

  


export default Referral