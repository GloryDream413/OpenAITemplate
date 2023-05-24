import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        className="prefix__st0"
        d="M12 5H7V2L1 6l6 4V7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H7v2h5c3.3 0 6-2.7 6-6s-2.7-6-6-6z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgComponent
