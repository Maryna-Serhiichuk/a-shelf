import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";
import { useCartLocalStorage } from "./useCartLocalStorage";

type UseAddDesire = {
  addDesire: (id: string) => void
}

export function useAddDesire(): UseAddDesire {
  const { useMeQuery } = accountApi
  const { data } = useMeQuery(undefined)

  const { addProduct } = useCartLocalStorage()

  const { useCreateCartlineMutation } = cartApi
  const [createCartline, {}] = useCreateCartlineMutation();

  const addDesire: UseAddDesire['addDesire'] = (id) => {
    if(data?.id) {
      createCartline({ id });
      return
    }

    addProduct(id)
  }

  return {
    addDesire
  }
}