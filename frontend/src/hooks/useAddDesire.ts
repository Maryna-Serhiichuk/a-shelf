import { accountApi } from "@/api/account";

type UseAddDesire = {
  addDesire: (id: string) => void
}

export function useAddDesire(): UseAddDesire {
  const { useCreateCartlineMutation } = accountApi
  const [createCartline, {}] = useCreateCartlineMutation();

  const addDesire: UseAddDesire['addDesire'] = (id) => {
    createCartline({ id });
  }

  return {
    addDesire
  }
}