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
        d="M8 5h5V2l6 4-6 4V7H8c-2.2 0-4 1.8-4 4s1.8 4 4 4h5v2H8c-3.3 0-6-2.7-6-6s2.7-6 6-6z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgComponent
