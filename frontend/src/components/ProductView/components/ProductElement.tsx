import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/Button";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/16/solid";

type DivProps = PropsWithChildren<{ className?: string }>;

const Name: FC<DivProps> = ({ children, className }) => {
    return <div className={classNames("text-3xl font-medium sm:text-4xl lg:text-5xl sm:font-light dark:text-stone-100 font-heading", className)}>
        {children}
    </div>
}

const SubName: FC<DivProps> = ({ children, className }) => {
    return <div className="dark:text-stone-100 font-medium text-md sm:text-lg lg:text-3xl font-heading">
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

const Buttons: FC<PropsWithChildren<{ className?: string, solidIcon?: boolean, onHeart?: () => void }>> = ({ children, className, solidIcon = FaceSmileIcon, onHeart }) => {
    return <div className={classNames(className, "flex")}>
        <Button size="large" className="w-full">
            Buy Now
        </Button>
        {children ??
            <Button onClick={onHeart} size="default" variant="outlined" className="ml-3">
                {solidIcon
                    ? <HeartIconSolid className="size-6" />
                    : <HeartIconOutline className="size-6" />
                }
            </Button>
        }
    </div>
}


ProductElement.Name = Name
ProductElement.SubName = SubName
ProductElement.Volume = Volume
ProductElement.Description = Description
ProductElement.Buttons = Buttons

export function ProductElement() {
    return null
}