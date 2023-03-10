
function Header({ title, category, desc, Icon, options, currentOption, fromColor, children }){ return (
<div className="bg-white md:px-8 pt-4 shadow-lg mb-px border-b border-gray-300">

    <div className="container mx-auto px-4 md:px-28 flex items-center">
        {Icon ? <div className={`mr-4 hidden md:inline-block text-${fromColor ? fromColor : "green-500"}`}>
            <Icon className="h-16 w-16 mb-4 mt-4" />
        </div> : null}
        <div>
            <div className={`text-sm font-medium text-${fromColor ? fromColor : "green-500"} -mb-1`}>
                {category}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 flex align-center -mb-1">
                {title}
            </h2> 
            <p className="text-base text-gray-500 text-sm md:text-md lg:text-lg md:mt-2  lg:mx-0 ">
                {desc}
            </p>
        </div>
    </div>

    <div className="container mx-auto px-4 md:px-28 pt-4 select-none ">
    {options && <div className="align-bottom bg-white text-left transform transition-all sm:align-middle transition inline-flex ">
        {options.map((option, index)=> <Option key={index} currentOption={currentOption} {...option} />)}
    </div>}
   
    {children}
    </div>
   
</div>
)}

export function Option({ title, Icon, onClick, currentOption, color}){
    let active = currentOption === title;
    return(
    <div className={`lg:py-4 lg:px-8 py-3 px-6 flex transition text-${active ? `${color ? color : "green"}-800` : "gray-500"} font-medium border-b -mb-px rounded-t-lg border-${active ? `${color ? color : "green"}-500` : "gray-400"} bg-${active ? `${color ? color : "green"}-100` : "white"} hover:bg-${active  ? `${color ? color : "green"}-200` : "gray-100"} cursor-pointer `} onClick={()=>onClick(title)}>
                    <div className={`md:mr-4  transition flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${active ? `${color ? color : "green"}` : "gray"}-300 text-${active ? `${color ? color : "green"}` : "gray"}-600`}>
                        <Icon className={`h-4 w-4 text-${active ? `${color ? color : "green"}` : "gray"}-600`} aria-hidden="true" />
                    </div>
                    <div className="hidden md:block">{title}</div>
            </div>
)}

export default Header