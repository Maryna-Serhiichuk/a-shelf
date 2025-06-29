import { CartLocalStorageType, CartSectionType, useCartLocalStorage, type CartlineStoreType } from "@/hooks/useCartLocalStorage"
import { useEffect, useState } from "react"
import { productApi } from "@/api/product";
import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";

export type IContext = {
    addToLocalStorageCart: (id: string, type: CartSectionType) => void
    updLocalStorageCartline: (id: string, quantity: number) => void
    removeLocalStorageCartline: (id: string) => void
    cart: CartLocalStorageType<Cartline, CartBargain>
}

export const useContext = (): IContext => {
    const { getCartlines, addProduct, changeQuantity, removeLine, clearCart } = useCartLocalStorage()

    const { useMeQuery } = accountApi
    const { data, isLoading, isError } = useMeQuery(undefined)
    const cartlines: Array<Cartline> = data?.cartlines ?? []
    const cartBargains: Array<CartBargain> = data?.cart_bargains ?? []


    const [cart, setCart] = useState<IContext['cart']>({})

    const { useGetProductsMutation, useGetBargainsMutation } = productApi
    const [getProductsByIds] = useGetProductsMutation()
    const [getBargainsByIds] = useGetBargainsMutation()

    const { useCreateCartlinesMutation } = cartApi
    const [setCartToStore] = useCreateCartlinesMutation()

    useEffect(() => {
        updateCartLocalStorage()
    }, [])

    useEffect(() => {
        getCartProductsFromLocalStorage()
    }, [])

    const addToLocalStorageCart: IContext['addToLocalStorageCart'] = (id, type) => {
        addProduct(id, type)
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

        if (!(
            lines &&
            lines?.products && lines?.products?.length > 0 ||
            lines?.bargains && lines?.bargains?.length > 0
        )) {
            setCart({})
            return
        }

        const productsResult = await getProductsByIds({ ids: lines?.products?.map(it => it?.id) })
        const products = productsResult?.data?.data

        const bargainsResult = await getBargainsByIds({ ids: lines?.bargains?.map(it => it?.id) })
        const bargains = bargainsResult?.data?.data

        if (!(products && products?.length > 0 || bargains && bargains?.length > 0)) return []

        let productsResponse: IContext['cart']['products'] = []
        let bargainsResponse: IContext['cart']['bargains'] = []

        if (products && products?.length > 0) {
            const ps: Array<Cartline> = products?.map((prod, index) => ({
                documentId: lines?.products?.find(line => line?.id === prod?.documentId)!.documentId ?? index.toString(),
                product: prod,
                quantity: lines?.products?.find(line => line?.id === prod?.documentId)?.quantity ?? 1
            }))

            productsResponse = ps
        }

        if (bargains && bargains?.length > 0) {
            const bs: Array<CartBargain> = bargains?.map((barg, index) => ({
                documentId: lines?.bargains?.find(line => line?.id === barg?.documentId)!.documentId ?? index.toString(),
                bargain: barg,
                quantity: lines?.bargains?.find(line => line?.id === barg?.documentId)?.quantity ?? 1
            }))

            bargainsResponse = bs
        }

        setCart({ products: productsResponse, bargains: bargainsResponse })
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
        setCart({ products: cartlines, bargains: cartBargains })
        return
    }

    const storeCartlines = async () => {
        const lines = getCartlines()

        if (!(lines?.products && lines?.products?.length > 0)) return

        await setCartToStore({ data: {
            products: lines?.products?.map(line => ({ id: line?.id, quantity: line?.quantity })) ?? [],
            bargains: lines?.bargains?.map(line => ({ id: line?.id, quantity: line?.quantity })) ?? []
        } })

        clearCart()
    }

    return {
        addToLocalStorageCart,
        updLocalStorageCartline,
        removeLocalStorageCartline,
        cart: {
            products: cart?.products?.filter(line => !line?.product?.isOutOfStock),
            bargains: cart?.bargains
        }
    }
}