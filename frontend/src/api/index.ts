import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './instance';

export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['User', 'Product'],
    baseQuery,
    endpoints: () => ({}),
})
