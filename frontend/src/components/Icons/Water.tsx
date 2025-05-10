import * as React from "react";
import type { SVGProps } from "react";
const SvgWater = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    {...props}
  >
    <defs>
      <style>
        {
          ".water_svg__a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round}"
        }
      </style>
    </defs>
    <path
      d="M29.067 33.365c0-5.597-10.134-23.347-10.134-23.347S8.798 27.768 8.798 33.365a10.135 10.135 0 1 0 20.27 0"
      className="water_svg__a"
    />
    <path
      d="M27.98 37.924a10 10 0 0 0 1.087.058 10.135 10.135 0 0 0 10.135-10.135C39.202 22.25 29.067 4.5 29.067 4.5s-3.53 6.184-6.424 12.402"
      className="water_svg__a"
    />
  </svg>
);
export default SvgWater;
