import { useMutation, UseMutationResult  } from "@tanstack/react-query";

type UseLoginResponse = UseMutationResult<
  LoginResponse,
  Error,
  LoginInput
>;

export const useLogin = (): UseLoginResponse => {
    const result =  useMutation<LoginResponse, Error, LoginInput>({
      mutationFn: async (input: LoginInput) => {
        const response = await fetch('http://127.0.0.1:1337/api/auth/local', {
          method: 'POST',
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Невірний логін або пароль');
        }
  
        return response.json();
      },
    });

    if(result?.data?.jwt) {
        localStorage.setItem('jwt', result?.data?.jwt)
    }

    return result
};