'use client'

import { FC } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { NavLink } from "@/components/NavLink";

export const ToShopButton: FC = () => {
    return <NavLink href={'/shop'}>
        <Button variant="text" Icon={ArrowLeftIcon} className="text-xl">
            To Shop
        </Button>
    </NavLink>
}