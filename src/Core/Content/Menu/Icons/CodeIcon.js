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
        d="M6 14H4V6h2V4H2v12h4zM7.1 17h2.1l3.7-14h-2.1zM14 4v2h2v8h-2v2h4V4z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgComponent
