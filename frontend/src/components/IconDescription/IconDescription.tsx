import { FC, SVGProps } from "react";

export interface IconDescriptionProps {
    title?: string
    description?: string
    icon: FC<SVGProps<SVGSVGElement>>
}

export const IconDescription: FC<IconDescriptionProps> = ({ title, description, icon: Icon }) => {
    return <div key={title} className="flex flex-row items-center sm:flex-col gap-3 grid-span-1">
        <div className="flex justify-center">
            <Icon fontSize={100} />
        </div>
        <div className="flex flex-col gap-1 sm:gap-[inherit]">
            <div className="text-left sm:text-center text-xl font-bold">
                {title}
            </div>
            <div className="text-left sm:text-center">
                {description}
            </div>
        </div>
    </div>
}