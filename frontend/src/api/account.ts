import { jwt } from "@/utils/jwt";
import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const accountApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query<User, undefined>({
            providesTags: ['Cartline'],
            query: () => ({
                url: `users/me`,
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
                const { data } = await queryFulfilled

                if (data?.jwt) {
                  jwt.set(data.jwt)
                }
              } catch (err) {
                throw err
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
                  jwt.set(data.jwt)
                }
              } catch (err) {
                throw err
              }
            },
        }),
    })
})