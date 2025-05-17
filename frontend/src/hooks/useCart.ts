import { accountApi } from "@/api/account";
import { useCartLocalStorage } from "./useCartLocalStorage";
import { productApi } from "@/api/product";
import { useEffect } from "react";

type UseCart = {
    getCartProducts: () => Promise<{ data: Cartline[] }>
}

export function useCart(): UseCart {
    const { useMeQuery } = accountApi
    const { data, isLoading, isError } = useMeQuery(undefined)
    
    const cartlines: Array<Cartline> = data?.cartlines ?? []

    const { getCartlines } = useCartLocalStorage()

    const { useGetProductsMutation } = productApi
    const [getProductsByIds] = useGetProductsMutation()

    useEffect(() => {
        getCartProducts()
    }, [data?.id])

    const getCartProducts = async (): Promise<Array<Cartline>> => {
        if(!data?.id) {
            const lines = getCartlines()

            if(!(lines && lines?.length > 0)) return []

            const result = await getProductsByIds({ ids: lines?.map(it => it?.id) })
            const products = result?.data?.data

            if(!(products && products?.length > 0)) return []

            const response: Array<Cartline> = products?.map((prod, index) => ({
                documentId: lines?.find(line => line?.id === prod?.documentId)!.documentId,
                product: prod,
                quantity: lines?.find(line => line?.id === prod?.documentId)?.quantity ?? 1
            }))

            return response

        }

        return cartlines
    }

    const cartResponse = async (): Promise<{ data: Array<Cartline> }> => {
        const products = await getCartProducts()
        return { data: products }
    }

    return {
        getCartProducts: cartResponse,

    }
}