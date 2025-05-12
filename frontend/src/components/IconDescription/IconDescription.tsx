import { FC } from "react";
import { Illustration } from "@/components/Illustration";

export const IconDescription: FC<IconDescription> = ({ heading, description, illustration }) => {
    return <div className="flex flex-row items-center sm:flex-col gap-3 grid-span-1">
        <div className="flex justify-center">
            <Illustration type={illustration} fontSize={100}/>
        </div>
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