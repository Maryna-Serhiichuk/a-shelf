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
        about: builder.query<Response<AboutPage>, undefined>({
            query: () => ({
                url: `about`,
                method: 'GET',
                params: {
                    'populate[0]': 'hero.button',
                    'populate[1]': 'hero.main',
                    'populate[2]': 'about.image',
                    'populate[3]': 'values.items',
                    'populate[4]': 'formula.left',
                    'populate[5]': 'formula.right',
                    'populate[6]': 'choose.image',
                    'populate[7]': 'cta.button',
                },
            }),
        }),
        contact: builder.query<Response<ContactPage>, undefined>({
            query: () => ({
                url: `contact`,
                method: 'GET',
                params: {
                    'populate[0]': 'items',
                    'populate[1]': 'illustration',
                },
            }),
        }),
    })
})