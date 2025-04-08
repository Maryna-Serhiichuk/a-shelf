import { FC } from "react";
import { Button } from "@/components/Button";
import { Price } from "@/components/Price";
import { NavLink } from "@/components/NavLink";
import { Img } from "@/components/Img";

export const ProductPreview: FC<Product> = ({ documentId, illustration, name, price, discount, volume }) => {
    return <div key={documentId} className="flex flex-col justify-between px-6 py-6 col-span-2 lg:col-span-1 bg-stone-100 dark:bg-stone-300">
        <div className="flex items-end justify-center h-[200px]">
            {illustration?.url &&
                <Img src={illustration?.url} />    
            }
        </div>
        <div>
            <NavLink href={`/product/${name?.replaceAll(' ', '-')}/${documentId}`}>
                <div className="py-3 text-stone-950 flex justify-center text-xl text-center hover:underline cursor-pointer">
                    <span>{name}, <span className="whitespace-nowrap">{volume}</span></span>
                </div>
            </NavLink>
            <div className="font-bold pb-3 text-stone-950 flex justify-center text-xl text-center">
                <Price price={price} discount={discount} mini />
            </div>
            <div className="flex justify-center">
                <Button>
                    Add to Card
                </Button>
            </div>
        </div>
    </div>
}