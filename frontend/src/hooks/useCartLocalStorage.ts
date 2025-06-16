const localStorageName = 'cart'

export type CartlineStoreType = { documentId: string, id: string, quantity: number }

export type CartSectionType = 'bargains' | 'products'

const types: Array<CartSectionType> = ['bargains', 'products']

export type CartLocalStorageType<P = undefined, B = undefined> = { products?: Array<P extends undefined ? CartlineStoreType : P>, bargains?: Array<B extends undefined ? CartlineStoreType : B> }

type UseCartLocalStorage = {
    addProduct: (id: string, type?: CartSectionType) => void
    getProductsIds: () => Array<string>
    getBargainsIds: () => Array<string>
    getCartlines: () => CartLocalStorageType
    changeQuantity: (id: string, quantity: number, type?: 'bargains' | 'products') => void
    removeLine: (id: string) => void
    clearCart: () => void
}

function idFormation(numer: string, type: string) {
    return type + '-' + numer
}

export function useCartLocalStorage(): UseCartLocalStorage {

    const addProduct: UseCartLocalStorage['addProduct'] = (id, type) => {
        const typeOrDefault = type ?? 'products'
        const cart = getCartlines()
        const section = cart?.[typeOrDefault] ?? []

        if (!cart) {
            setCart({ [typeOrDefault]: [{ documentId: idFormation('0', typeOrDefault), id, quantity: 1 }] })
            return
        }

        setCart({ ...cart, [typeOrDefault]: section?.concat({ documentId: idFormation(section?.length?.toString(), typeOrDefault), id, quantity: 1 }) })
    }

    const setCart = (cart: CartLocalStorageType) => {
        localStorage.setItem(localStorageName, JSON.stringify(cart))
    }

    const getCartlines: UseCartLocalStorage['getCartlines'] = () => {
        if (typeof window === 'undefined') return []

        const cartString = localStorage.getItem('cart')

        if (!cartString) return []

        return JSON.parse(cartString)
    }

    const getBargainsIds: UseCartLocalStorage['getBargainsIds'] = () => {
        const lines = getCartlines()

        return lines?.bargains?.map(it => it?.id) ?? []
    }

    const getProductsIds: UseCartLocalStorage['getProductsIds'] = () => {
        const lines = getCartlines()

        return lines?.products?.map(it => it?.id) ?? []
    }

    const changeQuantity: UseCartLocalStorage['changeQuantity'] = (id, quantity) => {
        const lines = getCartlines()

        const cart: Array<CartLocalStorageType> = types?.map(type => {
            return {
                [type]: lines?.[type]?.map(it => it?.documentId === id ? ({
                    ...it,
                    quantity
                }) : it)
            }
        })

        const cartParsed = cartTypesParses(cart)
        setCart(cartParsed)
    }

    const removeLine: UseCartLocalStorage['removeLine'] = (id) => {
        const lines = getCartlines()
console.log(id)
        const cart: Array<CartLocalStorageType> = types?.map(type => {
            return {
                [type]: lines?.[type]?.filter(it => it?.documentId !== id)
            }
        })

        const cartParsed = cartTypesParses(cart)
        setCart(cartParsed)
    }

    const clearCart = () => {
        localStorage.removeItem(localStorageName)
    }

    const cartTypesParses = (cart: Array<CartLocalStorageType>): CartLocalStorageType => {
        return cart.reduce((acc, item) => {
            return { ...acc, ...item };
        }, {})
    }

    return {
        addProduct,
        getProductsIds,
        getBargainsIds,
        getCartlines,
        changeQuantity,
        removeLine,
        clearCart
    }
}