import { cartApi } from "@/api/cart"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

type BuyItem = { product: Product, quantity: number }

export type IBuyContext = {
    openDrawer: boolean
    setOpenDrawer: Dispatch<SetStateAction<boolean>>
    addToOrder: (value: BuyItem) => void
    repeatOrder: (value: Array<BuyItem>) => void
    clearOrder: () => void
    orderList: Array<BuyItem>
    onDelete: (id: string) => void
    changeQuantity: (id: string, quantity: number) => void
    onCheckout: () => void
    loading: boolean
}

export const useBuy = (): IBuyContext => {
    const [loading, setLoading] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [products, setProducts] = useState<Array<BuyItem>>([])
    const router = useRouter();

    const { useCheckoutMutation } = cartApi
    const [checkout, { isLoading }] = useCheckoutMutation();

    useEffect(() => {
        if (!!products?.length) {
            localStorage.setItem('order', JSON.stringify(products))
        }
    }, [products])

    useEffect(() => {
        const savedOrder = localStorage.getItem('order')
        if (savedOrder) {
            setProducts(JSON.parse(savedOrder))
        }
    }, [])

    const repeatOrder: IBuyContext['repeatOrder'] = (value) => {
        setProducts(value)
        setOpenDrawer(true)
    }

    const addToOrder: IBuyContext['addToOrder'] = (value) => {
        if (!products.find(it => it.product.documentId === value.product.documentId)) {
            setProducts(prev => [...prev, value])
        }

        setOpenDrawer(true)
    }

    const onDelete: IBuyContext['onDelete'] = (id) => {
        setProducts(prev => prev?.filter(it => it?.product?.documentId !== id))
        if (products?.length <= 1) {
            setOpenDrawer(false)
            localStorage.removeItem('order')
        }
    }

    const changeQuantity: IBuyContext['changeQuantity'] = (id, quantity) => {
        setProducts(prev => prev?.map(it => it?.product?.documentId === id ? ({ ...it, quantity }) : it))
    }

    const onCheckout = async () => {
        setLoading(true)
        const transformForRequest: CheckoutInput = {
            items: products?.map(it => ({
                id: it?.product?.documentId,
                quantity: it?.quantity ?? 1
            }))
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
        orderList: products,
        onDelete,
        changeQuantity,
        onCheckout,
        clearOrder,
        loading
    }
}