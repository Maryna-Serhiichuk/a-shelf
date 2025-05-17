import { accountApi } from "@/api/account";
import { useCartLocalStorage } from "./useCartLocalStorage";
import { productApi } from "@/api/product";
import { useEffect, useState } from "react";
import { cartApi } from "@/api/cart";

type UseCart = {
    data: Array<Cartline>
}

export function useCart(): UseCart {
    const [cart, setCart] = useState<Array<Cartline>>([])

    const { useMeQuery } = accountApi
    const { data, isLoading, isError } = useMeQuery(undefined)

    const cartlines: Array<Cartline> = data?.cartlines ?? []

    const { getCartlines, clearCart } = useCartLocalStorage()

    const { useGetProductsMutation } = productApi
    const [getProductsByIds] = useGetProductsMutation()

    const { useCreateCartlinesMutation } = cartApi
    const [setCartToStore] = useCreateCartlinesMutation()

    useEffect(() => {
        const fetchCart = async () => {
            const cartResponse = await getCartProducts();
            setCart(cartResponse);
        };

        fetchCart();
    }, [data]);

    const getCartProducts = async (): Promise<Array<Cartline>> => {
        if (!data?.id) {
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

            return response
        }

        await storeCartlines()

        return cartlines
    }

    const storeCartlines = async () => {
        const lines = getCartlines()

        if (!(lines && lines?.length > 0)) return

        await setCartToStore({ data: lines?.map(line => ({ id: line?.id, quantity: line?.quantity })) })

        clearCart()
    }

    return {
        data: cart
    }
}