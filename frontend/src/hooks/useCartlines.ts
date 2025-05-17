import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";
import { useCartLocalStorage } from "./useCartLocalStorage";

type UseCartlineProps = {
    carlineProductIds: Array<string>
    changeCartline: (props: { id: string, quantity: number }) => void
    removeCartline: (id: string) => void
}

export function useCartlines(): UseCartlineProps {
    const { getProductsIds, changeQuantity, removeLine } = useCartLocalStorage()
    
    const { useMeQuery } = accountApi
    const { data: meData } = useMeQuery(undefined)

    const { useDeleteCartlineMutation, useUpdateCartlineMutation } = cartApi
    const [updateCartline, { }] = useUpdateCartlineMutation()
    const [deleteCartline, { isLoading, isError }] = useDeleteCartlineMutation()

    const removeCartline: UseCartlineProps['removeCartline'] = (id) => {
        if(meData?.id) {
            deleteCartline({ id })
            return
        }

        removeLine(id)
    }

    const changeCartline: UseCartlineProps['changeCartline'] = ({ id, quantity }) => {
        if(meData?.id) {
            updateCartline({ id, quantity })
            return
        }

        changeQuantity(id, quantity)
    }

    const cartlineProducts = () => {
        if(meData?.id) {
            return meData?.cartlines?.map(it => it?.product?.documentId) ?? []
        }

        return getProductsIds()
    }

    return {
        carlineProductIds: cartlineProducts(),
        changeCartline,
        removeCartline
    }
}