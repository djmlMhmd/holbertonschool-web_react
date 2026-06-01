// External libraries.
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import coursesReducer from '../../features/courses/coursesSlice';
import authReducer, { logout } from '../../features/auth/authSlice';

// Component.
import CourseList from './CourseList';

// Mock axios.
jest.mock('axios');

// Mock data.
const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

// Helper to build a test store.
const createTestStore = (courses = []) =>
  configureStore({
    reducer: { courses: coursesReducer, auth: authReducer },
    preloadedState: {
      courses: { courses },
      auth: { isLoggedIn: true, user: { email: '', password: '' } },
    },
  });

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: { courses: mockCourses } });
});

/******************
* COMPONENT TESTS *
******************/

test('Fetches and displays courses list on mount', async () => {
  const store = createTestStore([]);
  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  await waitFor(() => expect(screen.getByText('ES6')).toBeInTheDocument());
  expect(screen.getByText('Webpack')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
});

test('Resets courses array to empty after logout action is dispatched', () => {
  const store = createTestStore(mockCourses);
  store.dispatch(logout());

  expect(store.getState().courses.courses).toHaveLength(0);
});
