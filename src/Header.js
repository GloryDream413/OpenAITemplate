import React, { Component } from 'react';
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { computed,  } from 'mobx'
import { NavLink } from 'react-router-dom'
import { SwitchHorizontalIcon, ScaleIcon, DatabaseIcon, UserCircleIcon,
} from '@heroicons/react/outline'

import { IconDashboard,  } from './Icons'

import { useLocation } from 'react-router-dom'
import Body from './Components/Body'
import { withRouter } from "react-router-dom";

function HeaderExpand(props) {
	const location = useLocation();
	return <SuperHeader 
			active={location.pathname === "/" ? true : false}
			
			>{props.children}</SuperHeader>
}

@inject('store')
@observer
class SidebarCompontent extends Component {

	constructor(props) {
		super(props);
		if(this.props.location.pathname === "/signup"){
			this.props.history.push('/')
		}
		if(this.props.location.pathname === "/login"){
			this.props.history.push('/')
		}
		
	}
	componentDidMount(){
		document.addEventListener('keydown',this.shortcutHandler);
	}
	componentWillUnmount(){
		document.removeEventListener('keydown',this.shortcutHandler);
	}
	shortcutHandler = e => {
		if(e.keyCode===75 && e.ctrlKey){
			e.preventDefault();
			// select all text in input with id q
			document.getElementById("q").focus();
			document.getElementById("q").select();
		}
	}

	onKeyUp = (e) => {
		if(this.props.location.pathname !== "/search"){
			this.props.history.push('/search')
		}
		if(e.keyCode === 8){
			if(this.props.store.toolsKeyword === ""){
				this.props.history.push('/')
			}
		}
	}

	@computed get fromColor(){
		if(this.props.store.profile.credits <= 0){
			return "bg-red-200 text-red-600"
		}
		if(this.props.store.profile.status === "trialing"){
			return ""
		}
		if(this.props.store.profile.status === "active"){
			return ""
		}
		if(this.props.store.profile.status === "incomplete"){
			return ""
		}
		return "bg-red-200 text-red-600"
	}

	render() {
		return (
						<>
							<Textarea readOnly name="copy-textarea" id="copy-textarea" value={this.props.store.copyToClipboardText}  />
							 <HeaderExpand>
										<Body className="px-4 py-4 md:px-28 md:py-8 lg:py-12 flex items-center flex-1">
											<div className="mr-4">
											<NavLink to="/"><Logo /></NavLink>
											</div>
												<div>
													<div className="text-4xl relative font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-600 inline-block">OpenAI<span className="font-normal "> Template</span> 
														<div className="absolute top-0 ml-3 left-full bg-gradient-to-br from-gray-500 to-gray-500 text-white text-sm px-2 py-0.5 rounded-md font-normal hidden md:flex">gpt3</div>
													</div>
													<div className="hidden md:block text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 inline-block">Prepare and create your own OpenAI Prompts and Outputs</div>
													<div className="flex">
														<div className={`items-center flex inline-flex ${this.props.store.profile.credits ? " bg-gray-100 text-gray-500" : " bg-red-100 text-red-500"} text-sm rounded-md px-3 py-1 font-medium my-2 mr-2`}>
															<DatabaseIcon className="w-4 h-4 mr-2" />{this.props.store.profile.credits}&nbsp;<span className="hidden lg:block">credits remain</span>
														</div>
													</div>
												</div>
										</Body>
								 </HeaderExpand>
								<div className="border-b border-gray-300 bg-white shadow-sm ">
										<div className="container flex mx-auto px-4 md:px-28 flex select-none">
														<NavLink to="/"
														 exact
														 tabIndex={-1}
														 onClick={()=>this.props.store.toolsKeyword = ""}
														 activeClassName="bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
														 className="text-lg flex py-3 px-6 lg:py-4 lg:px-8 cursor-pointer hover:bg-gray-100 rounded-t-md font-medium transition items-center">
															 <IconDashboard className="w-7 h-7 lg:mr-4 transition" />
															 <div className="hidden lg:block">Tools</div>
															</NavLink>
														 
														<div className="relative text-gray-400 focus-within:text-green-500 flex flex-1 ">
															<label htmlFor="q" className="absolute inset-y-0 left-0 top-0 bottom-0 hidden md:flex items-center lg:pl-2 ">
																	<div type="submit" className="p-2 focus:outline-none focus:shadow-outline ">
																	<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 transition"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
																	</div>
															</label>
															<Input 
																type="search" 
																tabIndex={-1}
																id="q"
																name="q" 
																className="py-4 pl-4 md:pl-14 text-xl focus:outline-none focus:bg-white focus:text-gray-900 transition flex flex-1 w-full" placeholder="Search...  [Shortcut: Ctrl + K]" autoComplete="off" 
																value={this.props.store.toolsKeyword} 
																onChange={this.props.store.onChangeToolsKeyword} 
																onKeyUp={this.onKeyUp}
															/>
														</div>
														<NavLink to="/my-profile"
														 exact
														 tabIndex="-1"
														 activeClassName="bg-green-100 hover:bg-green-200 text-green-800 transition"
														 className={`text-lg flex py-3 px-6 xl:py-4 xl:px-8 cursor-pointer ${this.fromColor} hover:bg-gray-100 rounded-t-md font-medium transition items-center`}><UserCircleIcon className="w-7 h-7 lg:mr-4 transition" />
															<div className="hidden lg:block"> My Profile</div>
														</NavLink>


												</div>
												
								</div>
								{this.props.children}
						</>
			)
		}
}	

const Logo = () => (
	<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	className="w-20 h-20"
	viewBox="0 0 1512 1532"
  >
	<path
	  fill="#000"
	  d="M1412.22 627.024a381.628 381.628 0 0017.47-160.247 381.625 381.625 0 00-50.27-153.158 385.877 385.877 0 00-177.63-160.359 385.89 385.89 0 00-238.016-24.803A381.525 381.525 0 00833.74 33.209 381.565 381.565 0 00675.978.154a385.936 385.936 0 00-368.15 267.204A381.68 381.68 0 0052.672 452.459 385.97 385.97 0 002.636 686.458a385.954 385.954 0 0097.504 218.517 381.566 381.566 0 0032.793 313.405 385.943 385.943 0 00415.649 185.16 381.574 381.574 0 00287.797 128.31 385.89 385.89 0 00227.731-73.63 385.855 385.855 0 00140.54-193.73 381.572 381.572 0 00147.58-64.98c44-31.92 80.68-72.88 107.58-120.12a386.032 386.032 0 0049.92-233.94 385.967 385.967 0 00-97.51-218.426zM836.501 1431.71a286.188 286.188 0 01-183.744-66.43c2.325-1.26 6.403-3.5 9.061-5.13l304.978-176.16a49.595 49.595 0 0025.062-43.39V710.636l128.912 74.434c.67.337 1.25.834 1.69 1.451.44.616.72 1.333.81 2.079v356.07a287.37 287.37 0 01-84.08 202.77 287.387 287.387 0 01-202.689 84.27zm-616.724-263.39a286.085 286.085 0 01-34.242-192.354c2.264 1.36 6.22 3.776 9.059 5.407l304.977 176.157a49.582 49.582 0 0025.051 6.79c8.8 0 17.447-2.34 25.048-6.79l372.346-214.989v148.869c.042.76-.103 1.52-.425 2.21a4.548 4.548 0 01-1.417 1.74l-308.302 178.01a287.314 287.314 0 01-217.77 28.55 287.33 287.33 0 01-174.325-133.6zm-80.231-665.797a285.999 285.999 0 01149.41-125.856c0 2.627-.151 7.279-.151 10.507v352.327a49.55 49.55 0 0025.033 43.363l372.345 214.967-128.904 74.429c-.636.42-1.368.67-2.126.74a4.702 4.702 0 01-2.225-.34l-308.33-178.161a287.348 287.348 0 01-105.052-391.976zm1059.094 246.46L826.292 533.988l128.909-74.402a4.596 4.596 0 014.346-.391l308.333 178.004a287.1 287.1 0 01142.45 273.103 287.09 287.09 0 01-57.78 149.628 287.044 287.044 0 01-129.03 95.28V792.345a49.468 49.468 0 00-6.57-25.051 49.515 49.515 0 00-18.31-18.311zm128.3-193.103c-2.26-1.39-6.22-3.775-9.05-5.403L1012.9 374.312a49.683 49.683 0 00-50.09 0L590.463 589.31V440.443a4.613 4.613 0 011.842-3.955l308.302-177.857a287.08 287.08 0 01155.713-38.117 287.052 287.052 0 01151.87 51.322 287.09 287.09 0 01100.67 124.758 286.994 286.994 0 0118.08 159.286zM520.38 821.214l-128.939-74.433a4.572 4.572 0 01-2.505-3.535V387.174a287.084 287.084 0 0144.883-153.942 287.095 287.095 0 01120.453-105.853 287.069 287.069 0 01305.419 39.366c-2.324 1.268-6.372 3.503-9.06 5.134L545.653 348.042a49.548 49.548 0 00-25.063 43.36l-.21 429.812zm70.022-150.98l165.838-95.782 165.834 95.72v191.502L756.24 957.398l-165.838-95.724v-191.44z"
	></path>
  </svg>
	
)

const Input = styled.input`
	
`

const Textarea = styled.textarea`
	position: fixed;
	right:-9990px;
	top:-9990px;
`

// transition:ease-in-out 0.5s margin-top;
// 	transition-delay:0.05s;

const SuperHeader = styled.div`
	height:150px;
	background:white;
	margin-top:${props => props.active ? "0px" : "-150px" };
	display:${props => props.hidden ? "hidden" : "flex" };
	background-image:url(${require('./pattern-dots.svg').default});
	background-size:auto 50%;
	background-position: 20px 20px;
	background-repeat:no-repeat;
	position:relative;
	
`


	
export default withRouter(SidebarCompontent)