'use client'

import { FC, PropsWithChildren, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import classNames from "classnames";

export const CategoriesFilter: FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false)

    return <div className="w-full">
        <div className="flex md:hidden justify-end">
            <Button variant="text" onClick={() => setOpen(!open)}>
                <AdjustmentsHorizontalIcon className="size-10" />
                <span className="text-xl">
                    Filter
                </span>
            </Button>
        </div>
        <nav className={classNames("w-full flex flex-col gap-3 max-h-0 duration-300 opacity-0", {
            "max-h-100 opacity-100": open
        })}>
            {children}
        </nav>
    </div>
}