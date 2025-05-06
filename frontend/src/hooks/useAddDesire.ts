import { cartApi } from "@/api/cart";

type UseAddDesire = {
  addDesire: (id: string) => void
}

export function useAddDesire(): UseAddDesire {
  const { useCreateCartlineMutation } = cartApi
  const [createCartline, {}] = useCreateCartlineMutation();

  const addDesire: UseAddDesire['addDesire'] = (id) => {
    createCartline({ id });
  }

  return {
    addDesire
  }
}