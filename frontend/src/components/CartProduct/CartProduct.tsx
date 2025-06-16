import { FC } from "react";
import { NavLink } from "@/components/NavLink";
import { Img } from "@/components/Img";
import { Price } from "@/components/Price";

interface CartProductArgs extends Product {
    price: number
}

export const CartProduct: FC<CartProductArgs> = ({ documentId, name, illustration, volume, discount, price }) => {
    return <div className="grid grid-cols-[160px_1fr] grid-rows-[160px] overflow-hidden gap-5">
        <NavLink href={`/product/${name?.replaceAll(' ', '-')}/${documentId}`}>
            <div className="flex items-center py-2 w-full h-full">
                <Img src={illustration?.url} mini />
            </div>
        </NavLink>
        <div className="flex flex-col gap-1 sm:gap-2 py-3">
            <NavLink href={`/product/${name?.replaceAll(' ', '-')}/${documentId}`}>
                <div className="text-md sm:text-xl font-semibold hover:underline dark:text-stone-200">
                    {name}
                </div>
            </NavLink>
            <div className="text-sm text-stone-500 dark:text-stone-400">
                {volume}
            </div>
            <div className="text-xl font-medium text-stone-700 dark:text-stone-200">
                <Price price={price} discount={discount} />
            </div>
        </div>
    </div>
}