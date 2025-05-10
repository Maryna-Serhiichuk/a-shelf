import * as React from "react";
import type { SVGProps } from "react";
const SvgLeaf = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="leaf_svg__a"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    {...props}
  >
    <defs>
      <style>
        {
          ".leaf_svg__b{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round}"
        }
      </style>
    </defs>
    <path
      d="M38.366 5.5S-6.241 15.648 9.757 32.142C28.017 50.967 50.24 45.305 38.366 5.5"
      className="leaf_svg__b"
    />
    <path
      d="M38.371 5.57c-4.418 18.053-6.16 30.307-19.218 33.913"
      className="leaf_svg__b"
    />
  </svg>
);
export default SvgLeaf;
