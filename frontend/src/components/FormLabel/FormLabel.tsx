import { FC, PropsWithChildren } from "react"

export const FormLabel: FC<PropsWithChildren<{ label?: string }>> = ({ children, label }) => {
    return <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">
            {label}
        </div>
        {children}
    </div>
}