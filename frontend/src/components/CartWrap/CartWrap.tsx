import { FC, PropsWithChildren } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";

export interface CartWrapArgs extends PropsWithChildren {
    onTrash?: () => void
}

export const CartWrap: FC<CartWrapArgs> = ({ children, onTrash }) => {
    return <div className="relative flex justify-between py-4 px-4 bg-stone-100 dark:bg-stone-700">
        {children}
        <div className="absolute right-4 top-4 flex flex-col justify-start">
            <Button variant='text' onClick={onTrash} className="dark:hover:bg-stone-500">
                <TrashIcon height={26} className="dark:text-stone-200" />
            </Button>
        </div>
    </div>
}