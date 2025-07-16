import { FC, useMemo, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { useCartProviderContext } from "../context/CartContextProvider";
import { Price } from "@/components/Price";
import { Img } from "@/components/Img";
import { NavLink } from "@/components/NavLink";
import { Counter } from "@/components/Counter";
import { getPriceWithDiscount } from "@/utils/getPriceWithDiscount";
import { Delivery } from "@/components/Delivery";

export const BuyDrawer: FC = () => {
    const router = useRouter()
    const pathname = usePathname()
    const isCart = pathname.startsWith('/cart')

    const [addressMode, setAddressMode] = useState(false)
    const { openDrawer, setOpenDrawer, orderList, onDelete, changeQuantity, clearOrder, loading } = useCartProviderContext()

    const totalPrice = useMemo(() => {
        if (!orderList?.length) return 0

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

    const onCheckoutNext = () => {
        setAddressMode(true)
    }

    const onCancel = () => {
        if (!isCart) {
            router.push('/cart')
            setTimeout(() => {
                closeDrawer()
            }, 300)
            return
        }
        closeDrawer()
    }

    const closeDrawer = () => {
        setOpenDrawer(false)
        setTimeout(() => {
            setAddressMode(false)
        }, 1000)
    }

    const onClearCart = () => {
        clearOrder()
    }

    return <Drawer open={openDrawer} onClose={setOpenDrawer} position="right">
        <div className="p-4">
            {addressMode
                ? <div>
                    <Delivery
                        cancelButton={<Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>}
                    >
                        <BuyDrawerFooter totalPrice={totalPrice} />
                    </Delivery>
                </div>
                : <div>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="text-2xl font-heading font-semibold text-center">
                            Order Summary
                        </div>
                        <div className="flex justify-end">
                            <Button variant="outlined" onClick={onClearCart}>
                                Clear
                            </Button>
                        </div>
                    </div>
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
                    <div>
                        <BuyDrawerFooter totalPrice={totalPrice} />
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outlined" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button onClick={onCheckoutNext} loading={loading}>
                                Checkout Now
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    </Drawer>
}

const BuyDrawerFooter: FC<{ totalPrice?: number }> = ({ totalPrice }) => {
    return <div className="text-2xl border-y border-stone-200 mt-2 mb-6 py-3 flex justify-between">
        <div>
            Total:
        </div>
        <div>
            <Price price={totalPrice} />
        </div>
    </div>
}