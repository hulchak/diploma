import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';
import { authService } from '../../service/authService.js';

export const teacherApiSlice = createApi({
  reducerPath: 'teacherApi',
  tagTypes: ['Teachers'],
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
    fetchTeachers: builder.query({
      query: () => `/teachers`,
      providesTags: ['Teachers'],
    }),
    addTeacher: builder.mutation({
      query: (teacher) => ({
        url: `/teachers`,
        method: 'POST',
        body: teacher,
      }),
      invalidatesTags: ['Teachers'],
    }),
  }),
});

export const { useFetchTeachersQuery, useAddTeacherMutation } = teacherApiSlice;
