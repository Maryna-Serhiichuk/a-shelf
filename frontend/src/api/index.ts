import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './instance';

export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Cartline'],
    baseQuery,
    endpoints: () => ({}),
})
