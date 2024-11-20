import { configureStore } from '@reduxjs/toolkit';

import { studentApiSlice } from './students/studentApiSlice.js';
import studentSlice from './students/studentSlice.js';

import { teacherApiSlice } from './teachers/teacherApiSlice.js';
import teacherSlice from './teachers/teacherSlice.js';

import { coursesApiSlice } from './courses/coursesApiSlice.js';
import courseSlice from './courses/coursesSlice.js';

export const store = configureStore({
  reducer: {
    students: studentSlice,
    [studentApiSlice.reducerPath]: studentApiSlice.reducer,
    teachers: teacherSlice,
    [teacherApiSlice.reducerPath]: teacherApiSlice.reducer,
    courses: courseSlice,
    [coursesApiSlice.reducerPath]: coursesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentApiSlice.middleware,
      teacherApiSlice.middleware,
      coursesApiSlice.middleware
    ),
});
