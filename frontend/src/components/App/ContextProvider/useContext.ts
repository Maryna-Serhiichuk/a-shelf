import { useCart } from "@/hooks/useCart"
import { useCartLocalStorage, type CartlineStoreType } from "@/hooks/useCartLocalStorage"
import { useEffect, useState } from "react"

export type IContext = {
    localStorageCart: Array<CartlineStoreType>
    addToLocalStorageCart: (id: string) => void
    updLocalStorageCartline: (id: string, quantity: number) => void
    removeLocalStorageCartline: (id: string) => void
    productsFromLocalStorage: Array<Cartline>
}

export const useContext = (): IContext => {
    const { getCartProductsFromLocalStorage } = useCart()
    const { getCartlines, addProduct, changeQuantity, removeLine } = useCartLocalStorage()
    const [localStorageCart, setLocalStorageCart] = useState<Array<CartlineStoreType>>([])
    const [productsFromLocalStorage, setProductsFromLocalStorage] = useState<Array<Cartline>>([])

    useEffect(() => {
        updateCartLocalStorage()
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
        const cart = getCartlines()
        setLocalStorageCart(cart)
        const products = await getCartProductsFromLocalStorage()
        setProductsFromLocalStorage(products)
    }

    return {
        localStorageCart,
        addToLocalStorageCart,
        updLocalStorageCartline,
        removeLocalStorageCartline,
        productsFromLocalStorage
    }
}