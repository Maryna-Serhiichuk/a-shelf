import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const accountApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query<User, undefined>({
            providesTags: ['User'],
            query: () => ({
                url: `users/1`,
                method: 'GET',
                params: {
                    'populate[0]': 'products.illustration',
                    'populate[1]': 'products.discount',
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