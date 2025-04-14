import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL ?? 'http://localhost:1337/api',
});