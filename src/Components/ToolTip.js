import styled from 'styled-components'
import { observer,  } from 'mobx-react'

const ToolTipParent = observer((props) => {
	return (
		<Shortcut className={`select-none ${props.className} `}>
				{props.children}
				<Tooltip className="absolute pointer-events-none flex flex-col items-center group-hover:flex transition">
					<span className="relative z-10 p-3 text-sm leading-none text-gray-800 bg-white shadow-md text-center rounded-md transition">{props.title}</span>
				</Tooltip>
		</Shortcut>
)})


const Tooltip = styled.div`
	display:none;
	white-space: nowrap;
	left:50%;
	transform: translateX(-50%);
	bottom:100%;
	z-index:200;
`

const Shortcut = styled.div`
	position:relative;
	&:hover ${Tooltip} {
		display: flex;
	}
`

export default ToolTipParent