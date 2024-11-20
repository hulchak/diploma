import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config/index.js';
import { authService } from '../../service/authService.js';

export const studentApiSlice = createApi({
  reducerPath: 'studentApi',
  tagTypes: ['Students'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const authResult = authService.getToken();
      headers.set('Authorization', `Bearer ${authResult}`);
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchStudents: builder.query({
      query: () => `/students`,
      providesTags: ['Students'],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: `/students`,
        method: 'POST',
        body: student,
      }),
      invalidatesTags: ['Students'],
    }),
  }),
});

export const { useFetchStudentsQuery, useAddStudentMutation } = studentApiSlice;
