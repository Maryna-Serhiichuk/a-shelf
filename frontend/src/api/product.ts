import { getAttendings } from "@/utils/getAttendings";
import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const productApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        categories: builder.query<Response<Array<Category>>, undefined>({
            query: () => ({
                url: `categories`,
                method: 'GET',
            }),
        }),
        types: builder.query<Response<Array<Type>>, { category?: string }>({
            query: ({ category }) => ({
                url: `types`,
                method: 'GET',
                params: {
                    ...(category && { 'filters[category][slug][$eq]': category }),
                    'populate[0]': 'preview',
                    'populate[1]': 'category',
                },
            }),
        }),
        products: builder.query<Response<Array<Product>>, { type?: string }>({
            query: ({ type }) => ({
                url: `products`,
                method: 'GET',
                params: {
                    ...(type && { 'filters[type][slug][$eq]': type }),
                    'populate[0]': 'illustration',
                    'populate[1]': 'discount',
                },
            }),
        }),
        product: builder.query<Response<Product>, { id: string }>({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: 'GET',
                params: {
                    'populate[0]': 'illustration',
                    'populate[1]': 'discount',
                },
            }),
        }),
        bargains: builder.query<Response<Array<Bargain>>, { id?: string, type?: string }>({
            query: ({ id, type }) => ({
                url: `relevantBargains`,
                method: 'GET',
                params: {
                    ...(id && { id }),
                    ...(type && { type }),
                    'populate[0]': 'products.illustration',
                    'populate[1]': 'products.type',
                },
            }),
        }),
        lastAttendings: builder.query<Response<Array<Product>>, { productIds: Array<string>, id?: string }>({
            query: ({ productIds, id }) => {
              const actualIds = id ? productIds?.slice(1, 5) : productIds?.slice(0, 4);
      
              const params: Record<string, string> = {
                populate: 'illustration',
              };
      
              actualIds.forEach((pid, i) => {
                params[`filters[documentId][$in][${i}]`] = pid;
              });
      
              return {
                url: 'products',
                params,
              };
            },
            transformResponse: (response: Response<Product[]>, meta, arg) => {
              const sorted = response.data.sort(
                (a, b) =>
                  arg.productIds.indexOf(a.documentId) - arg.productIds.indexOf(b.documentId)
              );
      
              return {
                ...response,
                data: sorted,
              };
            },
        }),
    })
})