import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

export const BorderWrap: FC<PropsWithChildren<{className?: string}>> = ({ children, className }) => {
    return <div className={classNames("w-full py-4 px-8 border-3 border-stone-900 dark:border-stone-700 shadow-lg bg-[rgba(255,255,255,.9)] md:bg-stone-50 dark:bg-stone-800", className)}>
        {children}
    </div>
}