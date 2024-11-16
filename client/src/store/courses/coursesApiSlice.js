import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';
import { authService } from '../../service/authService.js';

export const coursesApiSlice = createApi({
  reducerPath: 'coursesApi',
  tagTypes: ['Courses'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      console.log(headers);
      const authResult = authService.getToken();
      console.log(authResult);
      headers.set('Authorization', 'Bearer ' + authResult);
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: (builder) => ({
    fetchCourses: builder.query({
      query: () => `/courses`,
      providesTags: ['Courses'],
    }),
    addCourses: builder.mutation({
      query: (courses) => ({
        url: `/courses`,
        method: 'POST',
        body: courses,
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const { useFetchCoursesQuery, useAddCoursesMutation } = coursesApiSlice;
