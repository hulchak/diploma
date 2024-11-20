import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTeacher: undefined,
};

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    teacherSelected: (state, { payload }) => {
      state.currentTeacher = payload;
    },
  },
});

export const { teacherSelected } = teacherSlice.actions;

export const selectCurrentTeacher = (state) => state.teachers.currentTeacher;

export default teacherSlice.reducer;
