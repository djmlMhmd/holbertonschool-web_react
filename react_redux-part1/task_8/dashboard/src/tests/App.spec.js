// External libraries.
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import coursesReducer from '../features/courses/coursesSlice';

// Component.
import App from '../App';

// Mock axios.
jest.mock('axios');

// Mock data.
const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
];

// Helper to build a test store.
const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: { auth: authReducer, notifications: notificationsReducer, courses: coursesReducer },
    preloadedState: {
      auth: { isLoggedIn: false, user: { email: '', password: '' }, ...initialState.auth },
      notifications: { notifications: [], displayDrawer: false, ...initialState.notifications },
      courses: { courses: [], ...initialState.courses },
    },
  });

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockImplementation((url) => {
    if (url.includes('notifications'))
      return Promise.resolve({ data: { notifications: mockNotifications } });
    if (url.includes('courses'))
      return Promise.resolve({ data: { courses: mockCourses } });
    return Promise.resolve({ data: [] });
  });
});

/******************
* COMPONENT TESTS *
******************/

test('Renders Login component when isLoggedIn is false', async () => {
  const store = createTestStore({ auth: { isLoggedIn: false } });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument()
  );
});

test('Renders CourseList component when isLoggedIn is true', async () => {
  const store = createTestStore({
    auth: { isLoggedIn: true, user: { email: 'user@test.com', password: 'strongpass' } },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument()
  );
});

test('Fetches and displays notification items on mount', async () => {
  const store = createTestStore({ notifications: { displayDrawer: true } });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByText('New course available')).toBeInTheDocument()
  );
  expect(screen.getByText('New resume available')).toBeInTheDocument();
});
