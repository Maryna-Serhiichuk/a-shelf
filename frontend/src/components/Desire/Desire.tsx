import { FC } from "react";
import { NavLink } from "@/components/NavLink";
import { Img } from "@/components/Img";
import { Price } from "@/components/Price";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";

export const Desire: FC<Cartline> = ({ documentId, product }) => {

    const removeItem = () => {
        // removeProduct(documentId)
    }

    return <div className="grid grid-cols-[200px_1fr] grid-rows-[200px] bg-stone-100 overflow-hidden">
        <NavLink href={`/product/${product?.name?.replaceAll(' ', '-')}/${documentId}`}>
            <div className="flex items-center py-2 w-full h-full">
                <Img src={product?.illustration?.url} mini />
            </div>
        </NavLink>
        <div className="flex justify-between py-4 px-4">
            <div className="flex flex-col gap-1 sm:gap-2">
                <NavLink href={`/product/${product?.name?.replaceAll(' ', '-')}/${documentId}`}>
                    <div className="text-md sm:text-xl font-semibold hover:underline">
                        {product?.name}
                    </div>
                </NavLink>
                <div className="text-sm text-stone-500">
                    {product?.volume}
                </div>
                <div className="text-xl font-medium text-stone-700">
                    <Price price={product?.price} discount={product?.discount} />
                </div>
                <div>
                    <Counter/>
                </div>
            </div>
            <div>
                <Button variant='text' onClick={removeItem}>
                    <TrashIcon height={26} />
                </Button>
            </div>
        </div>
    </div>
}