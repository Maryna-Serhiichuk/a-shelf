import { FC, useMemo } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { useCartProviderContext } from "../context/CartContextProvider";
import { Price } from "@/components/Price";
import { Img } from "@/components/Img";
import { NavLink } from "@/components/NavLink";
import { Counter } from "@/components/Counter";
import { getPriceWithDiscount } from "@/utils/getPriceWithDiscount";

export const BuyDrawer: FC = () => {
    const { openDrawer, setOpenDrawer, orderList, onDelete, changeQuantity, onCheckout } = useCartProviderContext()

    const totalPrice = useMemo(() => {
        if(!orderList?.length) return 0

        const result = orderList?.reduce((accumulator, currentValue) => {
            const priceWithDiscount = getPriceWithDiscount({ 
                price: currentValue?.product?.price,
                discount: currentValue?.product?.discount
            })
            const calculateWithQuantity = priceWithDiscount * currentValue?.quantity
            return accumulator + calculateWithQuantity
        }, 0)
        
        return result
    }, [orderList]);

    return <Drawer open={openDrawer} onClose={setOpenDrawer} position="right">
        <div className="p-4">
            <div>
                {orderList?.map(product => (
                    <div key={product?.product?.documentId} className="flex justify-between py-2">
                        <div className="flex gap-x-3">
                            <div className="w-18 h-30">
                                <Img src={product?.product?.illustration?.url} />
                            </div>
                            <div className="flex flex-col justify-between pb-4">
                                <div className="multiline-ellipsis-1">
                                    <NavLink href={`/product/${product?.product?.name?.replaceAll(' ', '-')}/${product?.product?.documentId}`}>
                                        <span className="font-medium hover:underline">{product?.product?.name}</span>
                                    </NavLink>
                                </div>
                                <div>
                                    <Price short mini price={product?.product?.price} discount={product?.product?.discount} />
                                </div>
                                <div>
                                    <Counter value={product?.quantity} onChange={q => changeQuantity(product?.product?.documentId, q)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant='text' onClick={() => onDelete(product?.product?.documentId)} className="dark:hover:bg-stone-500">
                                <TrashIcon height={26} className="dark:text-stone-200" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div className="text-2xl border-y border-stone-200 mt-2 mb-6 py-3 flex justify-between">
                    <div>
                        Total:
                    </div>
                    <div>
                        <Price price={totalPrice}/>
                    </div>
                </div>
                <Button onClick={onCheckout}>
                    Checkout Now
                </Button>
            </div>
        </div>
    </Drawer>
}