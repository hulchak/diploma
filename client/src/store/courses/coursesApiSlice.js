import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';
import { authService } from '../../service/authService.js';

export const coursesApiSlice = createApi({
  reducerPath: 'coursesApi',
  tagTypes: ['Courses'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      console.log(endpoint);
      const authResult = authService.getToken();
      headers.set('Authorization', 'Bearer ' + authResult);
      if (endpoint !== 'uploadFile') {
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCourses: builder.query({
      query: () => `/courses`,
      providesTags: ['Courses'],
    }),
    fetchCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Courses', id }],
    }),
    addCourses: builder.mutation({
      query: (courses) => ({
        url: `/courses`,
        method: 'POST',
        body: courses,
      }),
      invalidatesTags: ['Courses'],
    }),
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('video', file);
        console.log(formData);
        console.log(file);

        return {
          url: '/courses/upload',
          method: 'POST',
          body: formData,
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          //   Accept: 'multipart/form-data',
          // },

          // prepareHeaders: (headers) => {
          //   console.log(headers);
          //   const authResult = authService.getToken();
          //   console.log(authResult);
          //   headers.set('Authorization', 'Bearer ' + authResult);
          //   headers.set('Accept', 'multipart/form-data');
          //   headers.set('Content-Type', 'multipart/form-data');
          // },
          // Remove Content-Type header to let browser set it with boundary
          // prepareHeaders: (headers) => {
          //   const authResult = authService.getToken();
          //   headers.set('Authorization', `Bearer ${authResult}`);
          //   headers.set('Content-Type', 'multipart/form-data');
          //   return headers;
          // },
        };
      },
    }),
  }),
});

export const {
  useFetchCoursesQuery,
  useFetchCourseByIdQuery,
  useAddCoursesMutation,
  useUploadFileMutation,
} = coursesApiSlice;
