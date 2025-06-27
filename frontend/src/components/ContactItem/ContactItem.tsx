import { FC, PropsWithChildren } from "react"
import { Icon, IconTypeProp } from "@/components/Icon"

export const ContactItem: FC<PropsWithChildren<{ title?: string, icon: IconTypeProp }>> = ({ children, title, icon }) => {
    return <div className="flex dark:text-stone-200">
        <div className="w-9">
            <Icon type={icon} className="size-7 relative top-[1px]" />
        </div>
        <div className="flex flex-col lg:flex-row">
            {title &&
                <div className="w-35 text-xl sm:text-2xl font-bold shrink-0">
                    {title}
                </div>
            }
            <div className="text-sm sm:text-md">
                {children}
            </div>
        </div>
    </div>
}