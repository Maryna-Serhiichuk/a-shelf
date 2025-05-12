import { FC } from "react";
import { Comforter_Brush } from "next/font/google";
import classNames from "classnames";

const comforter = Comforter_Brush({ subsets: ["latin"], weight: ["400"] });

export const Decor: FC = () => {
    return <div className={classNames("text-right select-none tracking-[60px] text-teal-800 opacity-10 text-[250px]/55 transform-[rotate(5deg)]", comforter.className)}>
        <div>Facial</div>
        <div>Natural</div>
    </div>
}