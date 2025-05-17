const localStorageName = 'cart'

type CartlineStoreType = { id: string, quantity: number }

type UseCartLocalStorage = {
    addProduct: (id: string) => void
    getProductsIds: () => Array<string>
    getCartlines: () => Array<CartlineStoreType>
    changeQuantity: (id: string, type: 'increment' | 'decrement') => void
}

export function useCartLocalStorage(): UseCartLocalStorage {
    const addProduct = (id: string) => {
        const products = getCartlines()

        if (!products?.length) {
            setCart([{ id, quantity: 1 }])
            return
        }

        setCart(products.concat({ id, quantity: 1 }))
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

    const changeQuantity = (id: string, type: 'increment' | 'decrement') => {
        const lines = getCartlines()

        const changed = lines?.map(it => it?.id === id ? ({
            ...it,
            quantity: type === 'increment'
                ? it?.quantity + 1
                : (it?.quantity <= 1
                    ? it?.quantity
                    : it?.quantity - 1
                )
        }) : it)

        setCart(changed)
    }

    return {
        addProduct,
        getProductsIds,
        getCartlines,
        changeQuantity
    }
}