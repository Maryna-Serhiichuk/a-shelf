import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export const Container: FC<PropsWithChildren<{ theme?: 'default' | 'dimming' }>> = ({ children, theme }) => {
    return <div className={classNames(
        "flex justify-center w-full",
        {
            "bg-stone-100": theme === 'dimming'
        }
    )}>
        <div className={classNames("font-[family-name:var(--font-geist-sans)]",
            "p-4 sm:p-8 pb-20",
            "max-w-[1440px] w-[100%]",
        )}>
            {children}
        </div>
    </div>
}