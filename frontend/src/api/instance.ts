import { jwt } from '@/utils/jwt';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL ?? 'http://localhost:1337/api',
    prepareHeaders: (headers) => {
        const token = jwt.get()
    
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
    
        return headers
      },
});