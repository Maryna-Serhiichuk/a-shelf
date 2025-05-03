import { accountApi } from "@/api/account";

type UseAddDesire = {
    carlineProductIds: Array<string>
}

export function useCartlines(): UseAddDesire {
    const { useMeQuery } = accountApi
    const { data: meData } = useMeQuery(undefined)
    const carlineProductIds = meData?.cartlines?.map(it => it?.product?.documentId) ?? []

    return {
        carlineProductIds
    }
}