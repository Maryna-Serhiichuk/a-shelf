import classNames from "classnames"
import { FC, PropsWithChildren } from "react"

export const FormLabel: FC<PropsWithChildren<{ label?: string, className?: string }>> = ({ children, label, className }) => {
    return <div className={classNames("flex flex-col gap-2", className)}>
        <div className="text-xl font-semibold">
            {label}
        </div>
        {children}
    </div>
}