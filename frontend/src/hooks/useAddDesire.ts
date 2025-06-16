import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

type UseAddDesire = {
  addDesire: (id: string) => void
  addBargain: (id: string) => void
}

export function useAddDesire(): UseAddDesire {
  const { addToLocalStorageCart } = useProviderContext()
  const { useMeQuery } = accountApi
  const { data } = useMeQuery(undefined)

  const { useCreateCartlineMutation, useCreateCartBargainMutation } = cartApi
  const [createCartline, { }] = useCreateCartlineMutation();
  const [createCartBargain, { }] = useCreateCartBargainMutation()

  const addDesire: UseAddDesire['addDesire'] = (id) => {
    if (data?.id) {
      createCartline({ id });
      return
    }

    addToLocalStorageCart(id, 'products')
  }

  const addBargain: UseAddDesire['addBargain'] = (id) => {
    if (data?.id) {
      createCartBargain({ id });
      return
    }

    addToLocalStorageCart(id, 'bargains')
  }

  return {
    addDesire,
    addBargain
  }
}