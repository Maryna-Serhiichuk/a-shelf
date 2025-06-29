import { FC, Fragment } from "react";
import { Button } from "@/components/Button";
import { Price } from "@/components/Price";
import { NavLink } from "@/components/NavLink";
import { Img } from "@/components/Img";
import classNames from "classnames";
import { useAddDesire } from "@/hooks/useAddDesire";

export const ProductPreview: FC<Product & { className?: string }> = ({ documentId, illustration, name, price, discount, volume, className, isCart, isOutOfStock }) => {
    const { addDesire } = useAddDesire()

    const addToCart = () => {
        addDesire(documentId)
    }

    return <div key={documentId} className={classNames(
        "flex flex-col justify-between px-3 sm:px-6 py-3 sm:py-6 bg-stone-100 dark:bg-stone-700 shadow-item",
        className,
        { "opacity-40": isOutOfStock }
    )}>
        <div className="flex items-end justify-center h-[150px] md:h-[200px] ">
            {illustration?.url &&
                <Img src={illustration?.url} />
            }
        </div>
        <div>
            <NavLink href={`/product/${name?.replaceAll(' ', '-')}/${documentId}`}>
                <div className="py-3 text-stone-950 dark:text-stone-200 flex justify-center text-md sm:text-lg md:text-xl text-center hover:underline cursor-pointer">
                    <span>{name}, <span className="whitespace-nowrap">{volume}</span></span>
                </div>
            </NavLink>
            {!isOutOfStock &&
                <Fragment>
                    <div className="font-bold pb-3 text-stone-950 dark:text-stone-200 flex justify-center text-xl text-center">
                        <Price price={price} discount={discount} mini />
                    </div>
                    <div className="flex justify-center">
                        {isCart
                            ? <Button variant={'outlined'} className="dark:text-stone-200 dark:hover:dark:text-stone-400">
                                Added
                            </Button>
                            : <Button onClick={addToCart}>
                                Add to Card
                            </Button>
                        }
                    </div>
                </Fragment>
            }
        </div>
    </div>
}