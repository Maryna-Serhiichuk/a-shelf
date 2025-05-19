import { useCartLocalStorage, type CartlineStoreType } from "@/hooks/useCartLocalStorage"
import { useEffect, useState } from "react"
import { productApi } from "@/api/product";
import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";

export type IContext = {
    addToLocalStorageCart: (id: string) => void
    updLocalStorageCartline: (id: string, quantity: number) => void
    removeLocalStorageCartline: (id: string) => void
    cart: Array<Cartline>
}

export const useContext = (): IContext => {
    const { getCartlines, addProduct, changeQuantity, removeLine, clearCart } = useCartLocalStorage()

    const { useMeQuery } = accountApi
    const { data, isLoading, isError } = useMeQuery(undefined)
    const cartlines: Array<Cartline> = data?.cartlines ?? []

    const [cart, setCart] = useState<Array<Cartline>>([])

    const { useGetProductsMutation } = productApi
    const [getProductsByIds] = useGetProductsMutation()

    const { useCreateCartlinesMutation } = cartApi
    const [setCartToStore] = useCreateCartlinesMutation()

    useEffect(() => {
        updateCartLocalStorage()
    }, [])

    useEffect(() => {
        getCartProductsFromLocalStorage()
    }, [])

    const addToLocalStorageCart: IContext['addToLocalStorageCart'] = (id) => {
        addProduct(id)
        updateCartLocalStorage()
    }

    const updLocalStorageCartline: IContext['updLocalStorageCartline'] = (id, quantity) => {
        changeQuantity(id, quantity)
        updateCartLocalStorage()
    }

    const removeLocalStorageCartline: IContext['removeLocalStorageCartline'] = (id) => {
        removeLine(id)
        updateCartLocalStorage()
    }

    const updateCartLocalStorage = async () => {
        getCartProductsFromLocalStorage()
    }

    const getCartProductsFromLocalStorage = async () => {
        const lines = getCartlines()

        if (!(lines && lines?.length > 0)) return []

        const result = await getProductsByIds({ ids: lines?.map(it => it?.id) })
        const products = result?.data?.data

        if (!(products && products?.length > 0)) return []

        const response: Array<Cartline> = products?.map((prod, index) => ({
            documentId: lines?.find(line => line?.id === prod?.documentId)!.documentId,
            product: prod,
            quantity: lines?.find(line => line?.id === prod?.documentId)?.quantity ?? 1
        }))

        setCart(response)
    }

    useEffect(() => {
        getCartProducts()
    }, [data]);

    const getCartProducts = () => {
        if (!data?.id) {
            getCartProductsFromLocalStorage()
            return
        }
        storeCartlines()
        setCart(cartlines)
        return
    }

    const storeCartlines = async () => {
        const lines = getCartlines()

        if (!(lines && lines?.length > 0)) return

        await setCartToStore({ data: lines?.map(line => ({ id: line?.id, quantity: line?.quantity })) })

        clearCart()
    }

    return {
        addToLocalStorageCart,
        updLocalStorageCartline,
        removeLocalStorageCartline,
        cart: cart?.filter(line => !line?.product?.isOutOfStock)
    }
}