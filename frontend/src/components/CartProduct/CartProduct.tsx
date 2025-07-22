import { FC } from "react";
import { NavLink } from "@/components/NavLink";
import { Img } from "@/components/Img";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";

interface CartProductArgs extends Omit<Product, 'price'> {
    price?: number
    addItemToOrder?: () => void
    quantity?: number
    size?: number
}

export const CartProduct: FC<CartProductArgs> = ({ documentId, name, illustration, volume, discount, price, addItemToOrder, quantity, size }) => {
    const imagesSize = size ?? 160
    
    return <div className={`grid grid-cols-[100px_1fr] grid-rows-[150px] lg:grid-cols-[${imagesSize}px_1fr] lg:grid-rows-[${imagesSize}px] overflow-hidden gap-5`}>
        <NavLink href={`/product/${name?.replaceAll(' ', '-')}/${documentId}`}>
            <div className="flex items-center py-2 w-full h-full">
                <Img src={illustration?.url} mini />
            </div>
        </NavLink>
        <div className="flex flex-col justify-between pt-2">
            <div className="flex flex-col gap-1 lg:gap-2">
                <NavLink href={`/product/${name?.replaceAll(' ', '-')}/${documentId}`}>
                    <div className="text-sm/4 sm:text-lg/5.5 lg:text-2xl/5 font-semibold hover:underline dark:text-stone-200 multiline-ellipsis">
                        {name}
                    </div>
                </NavLink>
                <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    {volume}
                </div>
                <div className="flex text-sm/4.5 sm:text-lg font-medium text-stone-700 dark:text-stone-200 group discount-hidden">
                    {price && <Price price={price} discount={discount} /> }
                    {quantity &&
                        <div className="text-stone-400 ml-1.5">
                            x {quantity}
                        </div>
                    }
                </div>
            </div>
            {addItemToOrder &&
                <div>
                    <Button size="small" onClick={addItemToOrder}>
                        Buy
                    </Button>
                </div>
            }
        </div>
    </div>
}