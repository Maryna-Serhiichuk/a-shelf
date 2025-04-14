import { useMutation, UseMutationResult  } from "@tanstack/react-query";

  type RemoveDesire = {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  };
  

  type UseRemoveDesire = UseMutationResult<
    RemoveDesire,
    Error,
    string
  >;

export function useRemoveDesire(): UseRemoveDesire {
    return useMutation({
        mutationFn: removeDesire,
    });
}

export const removeDesire = async (id: string) => {
    const res = await fetch(`http://localhost:1337/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      throw new Error("Failed to remove product");
    }
  
    return res.json();
  };