import * as React from "react"
import { SVGProps } from "react"
const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={7}
    fill="none"
    {...props}
  >
    <path
      stroke="#222"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10.667 1 6 5.667 1.333 1"
    />
  </svg>
)
export default ChevronDownIcon
