import { cartApi } from "@/api/cart"
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from 'next/navigation';

type BuyItem = { product: Product, quantity: number }

export type IBuyContext = {
    openDrawer: boolean
    setOpenDrawer: Dispatch<SetStateAction<boolean>>
    addToOrder: (value: BuyItem) => void
    orderList: Array<BuyItem>
    onDelete: (id: string) => void
    changeQuantity: (id: string, quantity: number) => void
    onCheckout: () => void
}

export const useBuy = (): IBuyContext => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [products, setProducts] = useState<Array<BuyItem>>([])
    const router = useRouter();

    const { useCheckoutMutation } = cartApi
    const [checkout, { isLoading }] = useCheckoutMutation();

    const addToOrder: IBuyContext['addToOrder'] = (value) => {
        console.log(value)
        if (!products.find(it => it.product.documentId === value.product.documentId)) {
            setProducts(prev => [...prev, value])
        }

        setOpenDrawer(true)
    }

    const onDelete: IBuyContext['onDelete'] = (id) => {
        setProducts(prev => prev?.filter(it => it?.product?.documentId !== id))
        if(products?.length <= 1) {
            setOpenDrawer(false)
        }
    }

    const changeQuantity: IBuyContext['changeQuantity'] = (id, quantity) => {
        setProducts(prev => prev?.map(it => it?.product?.documentId === id ? ({ ...it, quantity }) : it))
    }

    const onCheckout = async () => {
        const transformForRequest: CheckoutInput = {
            items: products?.map(it => ({ 
                id: it?.product?.documentId, 
                quantity: it?.quantity ?? 1 
            }))
        }

        const responese = await checkout(transformForRequest)
        if(responese?.data?.url) {
            router.push(responese?.data?.url);
        }
    }

    return {
        openDrawer,
        setOpenDrawer,
        addToOrder,
        orderList: products,
        onDelete,
        changeQuantity,
        onCheckout
    }
}