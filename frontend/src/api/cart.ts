import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const cartApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        createCartlines: builder.mutation<Cartline, { data: { products?: Array<{ id: string, quantity: number }>, bargains?: Array<{ id: string, quantity: number }> } }>({
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

        createCartBargain: builder.mutation<CartBargain, { id: string }>({
          query: ({ id }) => ({
            url: `cart-bargains`,
            method: 'POST',
            body: { id }
          }),
          invalidatesTags: ['CartBargain'],
        }),
        updateCartBargain: builder.mutation<CartBargain, CartlineInput>({
            query: ({ id, ...data }) => ({
                url: `cart-bargains/${id}`,
                method: 'PUT',
                body: { data }
            }),
            invalidatesTags: ['CartBargain'],
        }),
        deleteCartBargain: builder.mutation<CartBargain, { id: string }>({
            query: ({ id }) => ({
                url: `cart-bargains/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CartBargain'],
        }),
        checkout: builder.mutation<any, CheckoutInput>({
          query: (body) => ({
              url: `checkout`,
              method: 'POST',
              body
          }),
          // invalidatesTags: ['CartBargain'],
        })
    })
})