import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

export const Container: FC<PropsWithChildren> = ({ children }) => {
    return <div className="flex justify-center w-full">
        <div className={classNames("min-h-screen font-[family-name:var(--font-geist-sans)]",
            "p-4 sm:p-8 pb-20",
            "max-w-[1440px] w-[100%]"
        )}>
            {children}
        </div>
    </div>
}