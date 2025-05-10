import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export const Container: FC<PropsWithChildren<{ theme?: 'default' | 'dimming' | 'background', full?: boolean }>> = ({ children, theme, full }) => {
    return <div className={classNames(
        "flex justify-center w-full relative",
        {
            "bg-stone-100": theme === 'dimming'
        }
    )}>
        {theme === 'background' &&
            <div className="absolute z-[1] w-full h-full">
                <div className="absolute z-[1] inset-0 pointer-events-none shadow-[inset_-300px_100px_200px_rgba(0,0,0,.12),inset_0px_0px_40px_rgba(0,0,0,.1))]"></div>
                <div className="h-[60%] bg-stone-200"/>
                <div className="h-[1px] bg-stone-300"/>
                <div className="h-[40%] bg-stone-100"/>
            </div>
        }
        <div className={classNames("font-[family-name:var(--font-geist-sans)]",
            "max-w-[1440px] w-[100%]",
            "relative z-[2]",
            { "p-2 sm:p-4 lg:p-8": !full }
        )}>
            {children}
        </div>
    </div>
}