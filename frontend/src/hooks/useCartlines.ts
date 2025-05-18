import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

type UseCartlineProps = {
    changeCartline: (props: { id: string, quantity: number }) => void
    removeCartline: (id: string) => void
}

export function useCartlines(): UseCartlineProps {
    const { updLocalStorageCartline, removeLocalStorageCartline } = useProviderContext()
    
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

        removeLocalStorageCartline(id)
    }

    const changeCartline: UseCartlineProps['changeCartline'] = ({ id, quantity }) => {
        if(meData?.id) {
            updateCartline({ id, quantity })
            return
        }

        updLocalStorageCartline(id, quantity)
    }

    return {
        changeCartline,
        removeCartline
    }
}