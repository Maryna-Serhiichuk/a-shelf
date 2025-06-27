import { FC, Fragment } from "react";
import { Img } from "@/components/Img";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { useAddDesire } from "@/hooks/useAddDesire";

export const BargainItem: FC<Bargain> = ({ documentId, products, label, price }) => {
    const { addBargain } = useAddDesire()

      const addBargainToCart = () => {
        addBargain(documentId)
    }

    return <div>
        <div className="flex flex-col md:flex-row justify-between items-center py-5 px-5 md:px-7 xl:px-15 bg-stone-100 dark:bg-stone-800">
            <div className="grid gap-1 sm:gap-3">
                <div className="text-xl sm:text-2xl font-bold text-center md:text-left dark:text-stone-200">
                    {label}
                </div>
                {products?.map(product => (
                    <div key={product?.documentId} className="text-md sm:text-lg text-center md:text-left dark:text-stone-400">
                        {product?.name}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                {products?.map((product, index) => (
                    <Fragment key={product?.documentId}>
                        {index !== 0 &&
                            <div className="relative w-10 h-10">
                                <span className="absolute left-1/2 top-0 h-full w-1 bg-black -translate-x-1/2"></span>
                                <span className="absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2"></span>
                            </div>
                        }
                        <div className="h-50 w-35 p-4">
                            <Img src={product?.illustration?.url} />
                        </div>
                    </Fragment>
                ))}
            </div>
            <div className="grid gap-2">
                <div className="flex justify-center text-xl font-bold line-through text-gray-500 dark:text-stone-500">
                    <Price price={products?.reduce((a, b) => a + b?.price, 0)} />
                </div>
                <div className="flex justify-center text-2xl font-bold dark:text-stone-300">
                    <Price price={price} />
                </div>
                <div>
                    <Button onClick={addBargainToCart}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    </div>
}