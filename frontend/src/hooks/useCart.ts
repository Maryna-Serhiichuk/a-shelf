import { accountApi } from "@/api/account";
import { useCartLocalStorage } from "./useCartLocalStorage";
import { useEffect, useState } from "react";
import { cartApi } from "@/api/cart";
// import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

type UseCart = {
    data: Array<Cartline>
}

export function useCart(): UseCart {
    // const { productsFromLocalStorage } = useProviderContext()
    const [cart, setCart] = useState<Array<Cartline>>([])

    const { useMeQuery } = accountApi
    const { data, isLoading, isError } = useMeQuery(undefined)

    const cartlines: Array<Cartline> = data?.cartlines ?? []

    const { getCartlines, clearCart } = useCartLocalStorage()

    const { useCreateCartlinesMutation } = cartApi
    const [setCartToStore] = useCreateCartlinesMutation()

    useEffect(() => {
        getCartProducts()
    }, [data]);

    const getCartProducts = () => {
        if (!data?.id) {
            // setCart(productsFromLocalStorage)
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
        data: cart,
    }
}