import { productApi } from "@/api/product";

type UseAddDesire = {
  addDesire: (id: string) => void
}

export function useAddDesire(): UseAddDesire {
    const { useAddProductToCartMutation } = productApi
    const [updateProduct, {
      isSuccess,
      error,
      isLoading: editing,
      reset: resetEditing,
  }] = useAddProductToCartMutation();

  const addDesire: UseAddDesire['addDesire'] = (id) => {
    updateProduct({ id });
  }

  return {
    addDesire
  }
}