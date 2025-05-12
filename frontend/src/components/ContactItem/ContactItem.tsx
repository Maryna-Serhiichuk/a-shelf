import { FC, PropsWithChildren } from "react"
import { Icon, IconTypeProp } from "@/components/Icon"

export const ContactItem: FC<PropsWithChildren<{ title?: string, icon: IconTypeProp }>> = ({ children, title, icon }) => {
    return <div className="flex">
        <div className="w-9">
            <Icon type={icon} className="size-7 relative top-[1px]" />
        </div>
        {title &&
            <div className="w-35 text-2xl font-bold">
                {title}
            </div>
        }
        <div className="">
            {children}
        </div>
    </div>
}