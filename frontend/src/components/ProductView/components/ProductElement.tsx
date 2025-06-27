import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { Markdown } from "@/components/Markdown";

type DivProps = PropsWithChildren<{ className?: string }>;

const Name: FC<DivProps> = ({ children, className }) => {
    return <div className={classNames("text-3xl font-medium sm:text-4xl lg:text-5xl sm:font-light dark:text-stone-100", className)}>
        {children}
    </div>
}

const SubName: FC<DivProps> = ({ children, className }) => {
    return <div className="dark:text-stone-100 font-medium text-md sm:text-lg lg:text-3xl">
        {children}
    </div>
}

const Volume: FC<DivProps> = ({ children, className }) => {
    return <div className={classNames("text-lg sm:text-xl font-extralight dark:text-stone-400", className)}>
        {children}
    </div>
}

const Description: FC<{ className?: string, data?: string }> = ({ data, className }) => {
    return <div className={classNames("text-sm sm:text-md", className)}>
        <Markdown data={data} />
    </div>
}



ProductElement.Name = Name
ProductElement.SubName = SubName
ProductElement.Volume = Volume
ProductElement.Description = Description

export function ProductElement() {
    return null
}