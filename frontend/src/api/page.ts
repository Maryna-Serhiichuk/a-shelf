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
    })
})