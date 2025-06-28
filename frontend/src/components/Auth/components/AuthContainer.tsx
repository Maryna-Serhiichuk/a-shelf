import { Button } from "@/components/Button";
import { FC, PropsWithChildren } from "react";

export const AuthContainer: FC<PropsWithChildren<{ title: string, driverTitle: string }>> = ({ children, title, driverTitle }) => {
    return <div className="px-2 sm:px-10 pt-8">
        <div className="text-4xl font-bold text-center uppercase pb-10">
            {title}
        </div>
        <div className="flex flex-col gap-10">
            {children}
            {/* <div className="flex gap-4 items-center">
                <div className="h-[1px] bg-stone-300 w-full" />
                <div className="text-center text-xl whitespace-nowrap text-stone-400">
                    {driverTitle}
                </div>
                <div className="h-[1px] bg-stone-300 w-full" />
            </div>
            <div>
                <Button>
                    Google
                </Button>
            </div> */}
        </div>
    </div>
}