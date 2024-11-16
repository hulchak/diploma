import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCourse: undefined,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    courseSelected: (state, { payload }) => {
      state.currentCourse = payload;
    },
  },
});

export const { courseSelected } = coursesSlice.actions;

export const selectCurrentCourse = (state) => state.courses.currentCourse;

export default coursesSlice.reducer;
