function Button({ title, onClick, Icon, disabled, children  }){
	return (
		<button 
			
			className={disabled ? 
				`select-none py-3 px-6 border-t-2 border-gray-300 bg-gray-300 hover:bg-gray-400 disabled hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer mt-4 md:mx-0 transition` :  
				`select-none py-3 px-6 border-t-2 border-gray-400 bg-gray-500 hover:bg-gray-600 hover:via-blue-700 hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer mt-4 md:mx-0 transition` } 
			onClick={disabled ? null : onClick}>
			{Icon && <Icon className={disabled ? `h-6 w-6 mr-2 text-gray-100` : "h-6 w-6 mr-2 text-gray-200"} />}
			{title}
			{children}
		</button>
	)
}

export default Button