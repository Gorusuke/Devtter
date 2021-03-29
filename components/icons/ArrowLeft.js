import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      height={35}
      viewBox="0 0 21 21"
      width={35}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(-1 0 0 1 20 2)"
      >
        <circle cx={8.5} cy={8.5} r={8} />
        <path d="M9.5 11.499l3-3-3-3M12.5 8.5h-8" />
      </g>
    </svg>
  )
}

export default SvgComponent
