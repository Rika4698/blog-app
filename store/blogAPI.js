import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    // GET All or Single
    getBlogs: builder.query({
      query: (id) => id ? `/blog?id=${id}` : '/blog',
      providesTags: ['Blog'],
    }),

    // CREATE (with formData)
    createBlog: builder.mutation({
      query: (formData) => ({
        url: '/blog',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),

    // UPDATE (with formData)
    updateBlog: builder.mutation({
      query: (formData) => ({
        url: '/blogs',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),

    // DELETE
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;