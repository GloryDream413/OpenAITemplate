import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 118.99 90"
      {...props}
    >
      <defs>
        <linearGradient
          id="prefix__linear-gradient"
          x1={90.62}
          y1={19.2}
          x2={22.35}
          y2={80.18}
          gradientTransform="matrix(1 0 0 -1 0 92)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#5391fe" />
          <stop offset={1} stopColor="#3e6dbf" />
        </linearGradient>
        <linearGradient
          id="prefix__linear-gradient-2"
          x1={21.67}
          y1={80.99}
          x2={89.25}
          y2={20.26}
          xlinkHref="#prefix__linear-gradient"
        />
        <style>
          {
            ".prefix__cls-3,.prefix__cls-4{fill-rule:evenodd}.prefix__cls-3{fill:#2c5591}.prefix__cls-4{fill:#fff}"
          }
        </style>
      </defs>
      <g id="prefix__Layer_2" data-name="Layer 2">
        <g id="prefix__Layer_1-2" data-name="Layer 1">
          <path
            d="M5 90a4.93 4.93 0 01-4-1.8 5.28 5.28 0 01-.89-4.47L18 5.82A7.65 7.65 0 0125.13 0H114a4.9 4.9 0 013.94 1.8 5.21 5.21 0 01.89 4.47L101 84.18A7.66 7.66 0 0193.85 90z"
            fill="url(#prefix__linear-gradient)"
            fillRule="evenodd"
          />
          <path
            d="M25.13 1H114a3.88 3.88 0 013.85 5.05L100 84a6.7 6.7 0 01-6.17 5H5a3.88 3.88 0 01-3.86-5L19 6a6.7 6.7 0 016.13-5z"
            fill="url(#prefix__linear-gradient-2)"
            fillRule="evenodd"
          />
          <path
            className="prefix__cls-3"
            d="M59.66 68.56h21.61a4.75 4.75 0 010 9.49H59.66a4.75 4.75 0 010-9.49zM73.68 47.46A7.49 7.49 0 0171.17 50L31.06 78.8A5.2 5.2 0 0125 70.4l36.12-26.2v-.54L38.39 19.49a5.06 5.06 0 01.43-7.13 5.07 5.07 0 017.15 0l27.27 29a5 5 0 01.44 6.1z"
          />
          <path
            className="prefix__cls-4"
            d="M72.68 46.46A7.49 7.49 0 0170.17 49L30.06 77.8A5.2 5.2 0 0124 69.4l36.12-26.2v-.54L37.39 18.49a5.06 5.06 0 01.43-7.13 5.07 5.07 0 017.15 0l27.27 29a5 5 0 01.44 6.1zM59.05 68h21.61a4.5 4.5 0 110 9H59.05a4.5 4.5 0 110-9z"
          />
        </g>
      </g>
    </svg>
  )
}

export default SvgComponent
