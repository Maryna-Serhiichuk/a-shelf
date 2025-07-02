'use client'

import { FC } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";

export const ToShopButton: FC = () => {
    return <Button variant="text" Icon={ArrowLeftIcon} className="text-xl">
        To Shop
    </Button>
}