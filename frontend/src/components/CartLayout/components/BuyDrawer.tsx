import { FC, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { useCartProviderContext } from "../context/CartContextProvider";
import { Price } from "@/components/Price";
import { Img } from "@/components/Img";
import { NavLink } from "@/components/NavLink";
import { Counter } from "@/components/Counter";
import { Delivery } from "@/components/Delivery";

export const BuyDrawer: FC = () => {
    const router = useRouter()
    const pathname = usePathname()
    const isCart = pathname.startsWith('/cart')

    const [addressMode, setAddressMode] = useState(false)
    const { totalPrice, openDrawer, setOpenDrawer, orderList, onDelete, changeQuantity, clearOrder, loading } = useCartProviderContext()

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
                    {orderList?.map(item => {
                        if ('product' in item) {
                            const product = item
                            return <div key={item?.id} className="flex justify-between py-2 border-b border-stone-200">
                                <div className="flex gap-x-3">
                                    <div className="shrink-[0] w-18 h-30">
                                        <Img src={product?.product?.illustration?.url} />
                                    </div>
                                    <div className="flex flex-col justify-between pb-4">
                                        <div className="multiline-ellipsis-1">
                                            <NavLink href={`/product/${product?.product?.name?.replaceAll(' ', '-')}/${product?.product?.documentId}`}>
                                                <span className="font-medium hover:underline">{product?.product?.name}</span>
                                            </NavLink>
                                        </div>
                                        <div>
                                            <Counter value={product?.quantity} onChange={q => changeQuantity(product?.id, q)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="flex justify-end">
                                        <Button variant='text' onClick={() => onDelete(product?.id)} className="dark:hover:bg-stone-500">
                                            <TrashIcon height={26} className="dark:text-stone-200" />
                                        </Button>
                                    </div>
                                    <div className="mb-3 text-lg font-semibold">
                                        <Price short mini price={product?.product?.price} discount={product?.product?.discount} />
                                    </div>
                                </div>
                            </div>
                        }
                        if ('bargain' in item) {
                            const bargain = item
                            return <div key={item?.id} className="flex justify-between py-2 border-b border-stone-200">
                                <div>
                                    {bargain?.bargain?.products?.map(prod => (
                                        <div key={prod?.id} className="flex gap-x-3">
                                            <div className="shrink-[0] w-20 h-20">
                                                <Img src={prod?.illustration?.url} />
                                            </div>
                                            <div className="flex flex-col justify-between pb-4">
                                                <div className="multiline-ellipsis-1">
                                                    <NavLink href={`/product/${prod?.name?.replaceAll(' ', '-')}/${prod?.documentId}`}>
                                                        <span className="font-medium hover:underline">{prod?.name}</span>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="flex justify-end">
                                        <Button variant='text' onClick={() => onDelete(bargain?.id)} className="dark:hover:bg-stone-500">
                                            <TrashIcon height={26} className="dark:text-stone-200" />
                                        </Button>
                                    </div>
                                    <div className="mb-3 text-lg font-semibold">
                                        <Price short mini price={bargain?.bargain?.price} />
                                    </div>
                                </div>
                            </div>
                        }
                    })}
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
        <div className="font-medium">
            Total:
        </div>
        <div className="font-semibold">
            <Price price={totalPrice} />
        </div>
    </div>
}