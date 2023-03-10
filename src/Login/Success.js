
import React, { Component } from 'react';

import { withRouter , Redirect } from "react-router-dom";
import Loading from '../Components/Loader'
import { observable, makeObservable, } from 'mobx'
import { observer, inject } from 'mobx-react'
@inject('store')
@observer
class Login extends Component {

	
	@observable loading = true
	
	constructor(props){
		super(props)
		makeObservable(this)
		
	}
	componentDidMount(){
		this.refresh = setInterval(() => {
			this.props.store.refreshTokenAndProfile();
			if(this.props.store.profile.status){
				this.loading = false
			}
		}, 1000);
	}
	componentWillUnmount(){
		clearInterval(this.refresh)
	}
	
	render() {
	return (
		<>
			{this.loading ? null : <Redirect to="/" />}
			<div className="container mx-auto lg:px-4 py-4 min-h-screen flex flex-col md:items-center md:justify-center">

				<div className="text-center mb-6">
					<Logo />
					<div>
						<div className="text-4xl font-bold text-gray-700">sub<span className="text-green-600 font-medium">editor</span><span className="text-gray-500 font-normal ">.ai</span></div>
					</div>
				</div>
			<div className={`min-w-full md:min-w-0 bg-white rounded-xl shadow-xl transform transition-all  transition shadow-md hover:shadow-2xl focus:shadow-2xl w-1/2`}>
			
              <div className="px-4 py-8 text-center">
              		<Loading className="w-24 h-24" active />
                </div>
               	 <div className="text-center ">
                    <div className="text-3xl font-medium text-gray-900">
                    	Generating Your Profile
                    </div>
					<p className="text-lg text-gray-500">
						1. Preparing your credits
					</p>
					
					<div className="flex flex-col p-4">
						<div className="font-medium rounded-lg text-lg px-4 py-4 bg-gray-300 text-white mt-4 border border-gray-300 inline-block" >
							Nearly Done...
						</div>
					</div>
                    </div>
			  </div>
			</div>
		
		</>)
		}
  }



  const Logo = () => (
	<svg className="w-24 h-24 inline-block" viewBox="0 0 148 170" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="6.46851" y="79.6786" width="100" height="100" transform="rotate(-45 6.46851 79.6786)" fill="url(#paint0_linear)"/>
	<circle cx="48.49" cy="47.4901" r="22.9739" transform="rotate(-45 48.49 47.4901)" fill="url(#paint1_linear)"/>
	<circle cx="129.135" cy="116.135" r="8.58055" transform="rotate(-45 129.135 116.135)" fill="url(#paint2_linear)"/>
	<rect x="74" y="104" width="48" height="48" transform="rotate(-90 74 104)" fill="url(#paint3_linear)"/>
	<rect y="57.0001" width="19" height="19" transform="rotate(-90 0 57.0001)" fill="url(#paint4_linear)"/>
	<path d="M18.4354 134.084L63.0843 89.4355L79.4269 150.427L18.4354 134.084Z" fill="url(#paint5_linear)"/>
	<path d="M101.652 26.6642L123.664 4.65179L131.721 34.7213L101.652 26.6642Z" fill="#4029B5"/>
	<defs>
	<linearGradient id="paint0_linear" x1="56.4685" y1="79.6786" x2="56.4685" y2="179.679" gradientUnits="userSpaceOnUse">
	<stop stopColor="#7B61FF"/>
	<stop offset="1" stopColor="#2103BA"/>
	</linearGradient>
	<linearGradient id="paint1_linear" x1="48.49" y1="24.5162" x2="48.49" y2="70.464" gradientUnits="userSpaceOnUse">
	<stop stopColor="#46E1C5"/>
	<stop offset="1" stopColor="#00836B"/>
	</linearGradient>
	<linearGradient id="paint2_linear" x1="129.135" y1="107.554" x2="129.135" y2="124.715" gradientUnits="userSpaceOnUse">
	<stop stopColor="#46E1C5"/>
	<stop offset="1" stopColor="#00836B"/>
	</linearGradient>
	<linearGradient id="paint3_linear" x1="98" y1="104" x2="98" y2="152" gradientUnits="userSpaceOnUse">
	<stop stopColor="#FFEC40"/>
	<stop offset="1" stopColor="#FFB931"/>
	</linearGradient>
	<linearGradient id="paint4_linear" x1="9.5" y1="57.0001" x2="9.5" y2="76.0001" gradientUnits="userSpaceOnUse">
	<stop stopColor="#FFC961"/>
	<stop offset="1" stopColor="#FFE600"/>
	</linearGradient>
	<linearGradient id="paint5_linear" x1="18.4354" y1="134.084" x2="74.5" y2="119" gradientUnits="userSpaceOnUse">
	<stop stopColor="#4029B5"/>
	<stop offset="1" stopColor="#130076"/>
	</linearGradient>
	</defs>
  </svg>
  )



export default withRouter(Login)