import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M11 7h2v10h-2v-4H7v4H5V7h2v4h4V7zm6.57 0A4.737 4.737 0 0115 9v1h2v7h2V7h-1.43z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgComponent
