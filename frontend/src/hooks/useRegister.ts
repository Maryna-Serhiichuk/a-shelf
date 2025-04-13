import { useMutation, UseMutationResult  } from "@tanstack/react-query";

  type UseRegisterResponse = UseMutationResult<
    RegisterResponse,
    Error,
    RegisterInput
  >;

export function useRegister(): UseRegisterResponse {
    return useMutation({
        mutationFn: registerUser,
    });
}

const registerUser = async ({
    username,
    email,
    password,
  }: RegisterInput) => {
    const res = await fetch("http://127.0.0.1:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if(data?.jwt) {
        localStorage.setItem('jwt', data?.jwt)
    }

    if (!res.ok) {
      throw new Error(data.error?.message || "Registration failed");
    }
  
    return data;
  };