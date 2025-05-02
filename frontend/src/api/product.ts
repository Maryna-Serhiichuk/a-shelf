import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const productApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        categories: builder.query<Category[], undefined>({
            query: () => {
                console.log('wowowo')
                return ({
                    url: `categories`,
                    method: 'GET',
                    // body
                })
            },
        }),
        product: builder.query<Product, { id: string }>({
            // providesTags: 'PRODUCT',
            query: (id) => `product/${id}`,
            // transformResponse: (res) => {
            //     return {}
            // }
        }),
        addProductToCart: builder.mutation<User, { id: string }>({
            query: (id) => ({
                url: `cart`,
                method: 'POST',
                body: { id }
            }),
        }),
    })
})