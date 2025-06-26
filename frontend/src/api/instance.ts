import { jwt } from '@/utils/jwt';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import url from '@/variables/url'

export const baseQuery = fetchBaseQuery({
  baseUrl: `${url.strapi}/api`,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = jwt.get()

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    }
    return headers
  },
});