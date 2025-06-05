import { jwt } from '@/utils/jwt';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST ?? 'http://127.0.0.1'}:1337/api`,
    prepareHeaders: (headers) => {
        const token = jwt.get()
    
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
    
        return headers
      },
});