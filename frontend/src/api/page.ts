import { baseApi } from ".";

const enhanceApi = baseApi.enhanceEndpoints({})

export const pageApi = enhanceApi.injectEndpoints({
    endpoints: (builder) => ({
        support: builder.query<Response<Array<SupportPage>>, undefined>({
            query: () => ({
                url: `support-pages`,
                method: 'GET',
            }),
        }),
        page: builder.query<Response<SupportPage | undefined>, { slug: string }>({
            query: ({ slug }) => ({
                url: `support-pages`,
                method: 'GET',
                params: {
                    'filters[slug][$eq]': slug
                }
            }),
            transformResponse: (response: Response<Array<SupportPage> | undefined>, meta, arg) => {
                const page = response?.data?.[0]
        
                return {
                    ...response,
                    data: page
                }
              },
        }),
    })
})