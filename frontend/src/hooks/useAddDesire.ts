import { accountApi } from "@/api/account";
import { cartApi } from "@/api/cart";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

type UseAddDesire = {
  addDesire: (id: string) => void
}

export function useAddDesire(): UseAddDesire {
  const { addToLocalStorageCart } = useProviderContext()
  const { useMeQuery } = accountApi
  const { data } = useMeQuery(undefined)

  const { useCreateCartlineMutation } = cartApi
  const [createCartline, {}] = useCreateCartlineMutation();

  const addDesire: UseAddDesire['addDesire'] = (id) => {
    if(data?.id) {
      createCartline({ id });
      return
    }

    addToLocalStorageCart(id)
  }

  return {
    addDesire
  }
}