import { productApi } from "@/api/product";
import { useMutation, UseMutationResult  } from "@tanstack/react-query";

  type AddDesire = {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  };
  

  type UseAddDesire = UseMutationResult<
    AddDesire,
    Error,
    string
  >;

export function useAddDesire(): UseAddDesire {
    // const { useProductQuery } = productApi

    // const cc = useProductQuery(
    //   { id },
    //   { skip: !id },
    // );

    // console.log(cc)

    return useMutation({
        mutationFn: addDesire,
    });
}

export const addDesire = async (id: string) => {
    const res = await fetch(`http://localhost:1337/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    
    if (!res.ok) {
      throw new Error("Failed to add product");
    }
  
    return res.json();
  };