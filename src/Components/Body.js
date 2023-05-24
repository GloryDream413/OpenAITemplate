export function Body(props) {
	return(
		<div className={`container mx-auto overflow-hidden ${props.className || "md:px-28 md:py-8 lg:py-12 "}`}>{props.children}</div>
	)
}

export function Grid(props) {
	return(
		<div className="grid grid-cols-6 xl:grid-cols-12 xl:gap-12">{props.children}</div>
	)
}

export function Col({span, children, className}) {
	return(
		<div className={`col-span-${span || "6"} ${className}`}>{children}</div>
	)
}

export default Body