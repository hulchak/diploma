import { configureStore } from '@reduxjs/toolkit';
import { catApiSlice } from './cats/catApiSlice.js';
import catSlice from './cats/catSlice.js';
import { coursesApiSlice } from './courses/coursesApiSlice.js';
import courseSlice from './courses/coursesSlice.js';

export const store = configureStore({
  reducer: {
    cats: catSlice,
    [catApiSlice.reducerPath]: catApiSlice.reducer,
    courses: courseSlice,
    [coursesApiSlice.reducerPath]: coursesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catApiSlice.middleware,
      coursesApiSlice.middleware
    ),
});
