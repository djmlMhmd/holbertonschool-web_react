import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

const API_BASE_URL = 'http://localhost:3000';

const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ENDPOINTS.courses);
      return response.data.courses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) course.isSelected = true;
    },
    unSelectCourse: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) course.isSelected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload.map((course) => ({ ...course, isSelected: false }));
      })
      .addCase(fetchCourses.rejected, (state) => {
        return state;
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export const { selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
