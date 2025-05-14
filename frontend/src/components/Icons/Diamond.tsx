import * as React from "react";
import type { SVGProps } from "react";
const SvgDiamond = (props: SVGProps<SVGSVGElement>) => (
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
          ".diamond_svg__a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round}"
        }
      </style>
    </defs>
    <path
      d="m9.701 11.492-4.879 4.877a1.1 1.1 0 0 0-.057 1.496L23.164 39.32a1.1 1.1 0 0 0 1.672 0l18.398-21.455a1.1 1.1 0 0 0-.057-1.496L35.806 9H15.505M5 17.15h38.5"
      className="diamond_svg__a"
    />
    <path
      d="M23.8 39 14 17l2-4 8-3.7m-9.754 2.087L16 13m8.2 26L34 17l-2-4-8-3.7m11.808.2L32.001 13M11.99 4.446 13.145 8h3.737l-3.024 2.197 1.155 3.555-3.024-2.197-3.024 2.197 1.155-3.555L7.098 8h3.737Zm22.855 26.5L36 34.5h3.737l-3.023 2.197 1.155 3.554-3.024-2.197-3.024 2.197 1.155-3.554-3.023-2.197h3.737Z"
      className="diamond_svg__a"
    />
  </svg>
);
export default SvgDiamond;
