// store/subscriptionAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subscriptionAPI = createApi({
  reducerPath: 'subscriptionAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (data) => ({
        url: '/subscribe',
        method: 'POST',
        body: data,
      }),
    }),

    getSubscriptions: builder.query({
      query: (params) => {
        const query = new URLSearchParams(params).toString();
        return `/subscribe?${query}`;
      },
    }),
    
    deleteSubscription: builder.mutation({
      query: (id) => ({
    url: `/subscribe?id=${id}`,  
    method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSubscribeMutation,
  useGetSubscriptionsQuery,
  useDeleteSubscriptionMutation,
} = subscriptionAPI;
