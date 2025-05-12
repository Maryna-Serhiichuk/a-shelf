import { FC } from "react";
import { Illustration } from "../Illustration";

export const IconText: FC<IconDescription> = ({ heading, description, illustration }) => {
    return <div className="flex flex-row items-center sm:flex-col gap-3 grid-span-1">
        <div className="relative flex justify-center">
            <div className="relative opacity-30 transform-[translate(-30px,_15px)]">
                <div className="absolute top-0 left-0 h-[80px] w-[50px] bg-teal-800 rounded-[60%_30%_20_30%] transform-[rotate(-20deg)]"/>
                <div className="absolute top-[15px] left-[30px] h-[80px] w-[50px] bg-teal-800 rounded-[30%_60%_30%_20] transform-[rotate(70deg)]"/>
            </div>
            <Illustration type={illustration} fontSize={100} className="relative z-1" />
        </div>
        <div className="flex flex-col gap-1 sm:gap-[inherit]">
            <div className="text-left sm:text-center text-3xl font-bold">
                {heading}
            </div>
            <div className="text-left sm:text-center">
                {description}
            </div>
        </div>
    </div>
}