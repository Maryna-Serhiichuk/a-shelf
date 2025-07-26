import { cartApi } from "@/api/cart"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { getPriceWithDiscount } from "@/utils/getPriceWithDiscount";

export type BuyItem = { quantity: number } & ({ product: Product } | { bargain: Bargain })

export type IBuyContext = {
    openDrawer: boolean
    setOpenDrawer: Dispatch<SetStateAction<boolean>>
    addToOrder: (value: BuyItem) => void
    repeatOrder: (value: Array<BuyItem>) => void
    clearOrder: () => void
    orderList: Array<BuyItem & { id: string }>
    onDelete: (id: string) => void
    changeQuantity: (id: string, quantity: number) => void
    onCheckout: () => void
    loading: boolean
    totalPrice: number
}

export const useBuy = (): IBuyContext => {
    const [loading, setLoading] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [orderItems, setProducts] = useState<IBuyContext['orderList']>([])
    const router = useRouter();

    const { useCheckoutMutation } = cartApi
    const [checkout, { isLoading }] = useCheckoutMutation();

    useEffect(() => {
        if (!!orderItems?.length) {
            localStorage.setItem('order', JSON.stringify(orderItems))
        }
    }, [orderItems])

    useEffect(() => {
        const savedOrder = localStorage.getItem('order')
        if (savedOrder) {
            setProducts(JSON.parse(savedOrder))
        }
    }, [])

    const totalPrice = useMemo(() => {
        if (!orderItems?.length) return 0

        const result = orderItems?.reduce((accumulator, currentValue) => {

            if ('product' in currentValue) {
                const priceWithDiscount = getPriceWithDiscount({
                    price: currentValue?.product?.price,
                    discount: currentValue?.product?.discount
                })
                const calculateWithQuantity = priceWithDiscount * currentValue?.quantity
                return accumulator + calculateWithQuantity
            }

            if ('bargain' in currentValue) {
                return accumulator + currentValue?.bargain?.price
            }

            return accumulator + 0
        }, 0)

        return result
    }, [orderItems]);

    const repeatOrder: IBuyContext['repeatOrder'] = (value) => {
        setProducts(value?.map(it => ({ ...it, id: v4() })))
        setOpenDrawer(true)
    }

    const addToOrder: IBuyContext['addToOrder'] = (value) => {

        if ('product' in value) {
            const onlyProducts = orderItems.filter(item => 'product' in item);

            if (!onlyProducts.find(it => it.product.documentId === value.product.documentId)) {
                setProducts(prev => [...prev, { ...value, id: v4() }])
            }
        }

        if ('bargain' in value) {
            const onlyBargains = orderItems.filter(item => 'bargain' in item);

            if (!onlyBargains.find(it => it.bargain.documentId === value.bargain.documentId)) {
                setProducts(prev => [...prev, { ...value, id: v4() }])
            }
        }

        setOpenDrawer(true)
    }

    const onDelete: IBuyContext['onDelete'] = (id) => {
        setProducts(prev => prev?.filter(it => it?.id !== id))
        if (orderItems?.length <= 1) {
            setOpenDrawer(false)
            localStorage.removeItem('order')
        }
    }

    const changeQuantity: IBuyContext['changeQuantity'] = (id, quantity) => {
        setProducts(prev => prev?.map(it => it?.id === id ? ({ ...it, quantity }) : it))
    }

    const onCheckout = async () => {
        setLoading(true)
        const transformForRequest: CheckoutInput = {
            items: orderItems?.map(it => {
                if ('product' in it) {
                    return {
                        id: it?.product?.documentId,
                        quantity: it?.quantity ?? 1,
                        type: 'product'
                    }
                }
                if ('bargain' in it) {
                    return {
                        id: it?.bargain?.documentId,
                        quantity: 1,
                        type: 'bargain'
                    }
                }
                return undefined
            }).filter((item): item is CheckoutInputItem => item !== undefined) ?? []
        }

        const responese = await checkout(transformForRequest)
        if (responese?.data?.url) {
            router.push(responese?.data?.url);
        }
        setLoading(false)
    }

    const clearOrder: IBuyContext['clearOrder'] = () => {
        setProducts([])
        localStorage.removeItem('order')
        setTimeout(() => {
            setOpenDrawer(false)
        }, 200)
    }

    return {
        openDrawer,
        setOpenDrawer,
        addToOrder,
        repeatOrder,
        orderList: orderItems,
        onDelete,
        changeQuantity,
        onCheckout,
        clearOrder,
        loading,
        totalPrice
    }
}