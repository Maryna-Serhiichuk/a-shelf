import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const productApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        product: builder.query<Product, { id: string }>({
            // providesTags: 'PRODUCT',
            query: (id) => `product/${id}`,
            // transformResponse: (res) => {
            //     return {}
            // }
        }),
    })
})