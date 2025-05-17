const localStorageName = 'cart'

type CartlineStoreType = { documentId: string, id: string, quantity: number }

type UseCartLocalStorage = {
    addProduct: (id: string) => void
    getProductsIds: () => Array<string>
    getCartlines: () => Array<CartlineStoreType>
    changeQuantity: (id: string, quantity: number) => void
    removeLine: (id: string) => void
    clearCart: () => void
}

export function useCartLocalStorage(): UseCartLocalStorage {
    const addProduct = (id: string) => {
        const products = getCartlines()

        if (!products?.length) {
            setCart([{ documentId: '0', id, quantity: 1 }])
            return
        }

        setCart(products.concat({ documentId: products?.length?.toString(), id, quantity: 1 }))
    }

    const setCart = (cart: Array<CartlineStoreType>) => {
        localStorage.setItem(localStorageName, JSON.stringify(cart))
    }

    const getCartlines: UseCartLocalStorage['getCartlines'] = () => {
        if (typeof window === 'undefined') return []

        const cartString = localStorage.getItem('cart')

        if (!cartString) return []

        return JSON.parse(cartString)
    }

    const getProductsIds: UseCartLocalStorage['getProductsIds'] = () => {
        const lines = getCartlines()

        return lines?.map(it => it?.id)
    }

    const changeQuantity: UseCartLocalStorage['changeQuantity'] = (id, quantity) => {
        const lines = getCartlines()

        const changed = lines?.map(it => it?.documentId === id ? ({
            ...it,
            quantity
        }) : it)

        setCart(changed)
    }

    const removeLine: UseCartLocalStorage['removeLine'] = (id) => {
        const lines = getCartlines()

        const changed = lines?.filter(it => it?.documentId !== id)

        setCart(changed)
    }

    const clearCart = () => {
        localStorage.removeItem(localStorageName)
    }

    return {
        addProduct,
        getProductsIds,
        getCartlines,
        changeQuantity,
        removeLine,
        clearCart
    }
}