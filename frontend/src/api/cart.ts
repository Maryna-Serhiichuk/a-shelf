import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const cartApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        createCartlines: builder.mutation<Cartline, { data: Array<{ id: string, quantity: number }> }>({
          query: ({ data }) => ({
            url: `create-cartlines`,
            method: 'POST',
            body: { data }
          }),
          invalidatesTags: ['Cartline'],
        }),
        createCartline: builder.mutation<Cartline, { id: string }>({
          query: ({ id }) => ({
            url: `cartlines`,
            method: 'POST',
            body: { id }
          }),
          invalidatesTags: ['Cartline'],
        }),
        updateCartline: builder.mutation<Cartline, CartlineInput>({
            query: ({ id, ...data }) => ({
                url: `cartlines/${id}`,
                method: 'PUT',
                body: { data }
            }),
            invalidatesTags: ['Cartline'],
        }),
        deleteCartline: builder.mutation<Cartline, { id: string }>({
            query: ({ id }) => ({
                url: `cartlines/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cartline'],
        }),
    })
})