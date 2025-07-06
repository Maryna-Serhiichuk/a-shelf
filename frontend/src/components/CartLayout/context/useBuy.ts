import { Dispatch, SetStateAction, useState } from "react"

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

    const onCheckout = () => {
        console.log(products)
        // api to paypal
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