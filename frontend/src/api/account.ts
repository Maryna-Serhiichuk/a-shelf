import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const accountApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query<User, undefined>({
            providesTags: ['Cartline'],
            query: () => ({
                url: `users/1`,
                method: 'GET',
                params: {
                    'populate[2]': 'cartlines.product',
                    'populate[3]': 'cartlines.product.illustration',
                    'populate[4]': 'cartlines.product.discount',
                },
            }),
        }),
        login: builder.mutation<LoginResponse, LoginInput>({
            query: (body) => ({
              url: 'auth/local',
              method: 'POST',
              body,
            }),

            async onQueryStarted(arg, { queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;

                if (data?.jwt) {
                  localStorage.setItem('jwt', data.jwt);
                }
              } catch (err) {
                console.error('Login failed:', err);
              }
            },
        }),    
        register: builder.mutation<RegisterResponse, RegisterInput>({
            query: ({ username, email, password }) => ({
              url: 'auth/local/register',
              method: 'POST',
              body: { username, email, password },
            }),
            async onQueryStarted(_, { queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;
                if (data?.jwt) {
                  localStorage.setItem('jwt', data.jwt);
                }
              } catch (err) {
                console.error('Registration failed:', err);
              }
            },
        }),  
    })
})