import { accountApi } from "@/api/account";
import { useCartLocalStorage } from "./useCartLocalStorage";

type UseCartline = {
    carlineProductIds: Array<string>
}

export function useCartlines(): UseCartline {
    const { getProductsIds } = useCartLocalStorage()
    
    const { useMeQuery } = accountApi
    const { data: meData } = useMeQuery(undefined)

    const cartlineProducts = () => {
        if(meData?.id) {
            return meData?.cartlines?.map(it => it?.product?.documentId) ?? []
        }

        return getProductsIds()
    }

    return {
        carlineProductIds: cartlineProducts()
    }
}