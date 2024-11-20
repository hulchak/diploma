import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStudent: undefined,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    studentSelected: (state, { payload }) => {
      state.currentStudent = payload;
    },
  },
});

export const { studentSelected } = studentSlice.actions;

export const selectCurrentStudent = (state) => state.students.currentStudent;

export default studentSlice.reducer;
