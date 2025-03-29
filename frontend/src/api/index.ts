import {
    createApi,
    fetchBaseQuery,
    retry,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
});