import { FC } from "react";

export const IconDescription: FC<IconDescription> = ({ heading, description }) => {
    return <div className="flex flex-row items-center sm:flex-col gap-3 grid-span-1">
        {/* <div className="flex justify-center">
            <Icon fontSize={100} /> // icon: Icon
        </div> */}
        <div className="flex flex-col gap-1 sm:gap-[inherit]">
            <div className="text-left sm:text-center text-xl font-bold">
                {heading}
            </div>
            <div className="text-left sm:text-center">
                {description}
            </div>
        </div>
    </div>
}