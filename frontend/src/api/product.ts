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
        products: builder.query<Response<Array<Product>>, { type?: string, search?: string }>({
            query: ({ type, search }) => ({
                url: `products`,
                method: 'GET',
                params: {
                    ...((type && !search) && { 'filters[type][slug][$eq]': type }),
                    ...(search && { 'filters[$or][0][name][$containsi]': search }),
                    ...(search && { 'filters[$or][1][ingredients][label][$containsi]': search }),
                    ...(search && { 'filters[$or][2][subname][$containsi]': search }),
                    ...(search && { 'filters[$or][3][composition][$containsi]': search }),
                    ...(search && { 'filters[$or][4][using][$containsi]': search }),
                    ...(search && { 'filters[$or][5][purpose][$containsi]': search }),
                    ...(search && { 'filters[$or][6][description][$containsi]': search }),
                    'populate[0]': 'illustration',
                    'populate[1]': 'discount',
                    'sort[0]': 'isOutOfStock:asc'
                },
            }),
        }),
        getProducts: builder.mutation<Response<Array<Product>>, { ids?: Array<string> }>({
            query: ({ ids }) => ({
                url: `products-by-ids`,
                method: 'POST',
                body: { ids, populate: { illustration: true, discount: true } },
            }),
        }),
        product: builder.query<Response<Product>, { id: string }>({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: 'GET',
                params: {
                    'populate[0]': 'illustration',
                    'populate[1]': 'discount',
                    'populate[2]': 'ingredients',
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
            transformResponse: (response: Response<Array<Product>>, meta, arg) => {
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