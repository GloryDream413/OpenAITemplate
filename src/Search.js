import React, { Component } from 'react';
import MainBody from './Components/Body'
import { Grid, Tool } from './Dashboard'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

@inject('store')
@observer
class Search extends Component {

	@computed get permissions() {
		return this.props.store.tools.filter(tool=>
			tool.permissions.some(r=> this.props.store.profile.permissions.includes(r))
		)
	}

	render() {
	return (
			<>
			<MainBody className="px-4 py-4 md:px-28 md:py-8 lg:py-12">
	
			<Grid>
				{this.permissions.map((tool, index) => 
					<Tool 
						key={index}
						group={tool.category}
						title={tool.title} 
						to={tool.to} 
						Icon={tool.Icon} 
						desc={tool.desc} 
						fromColor={tool.fromColor} 
						toColor={tool.toColor} 
					/>)} 
			</Grid>
						
			</MainBody>
			</>)
}
  }




export default Search