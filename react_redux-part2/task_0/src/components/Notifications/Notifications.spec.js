// External libraries.
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import notificationsReducer from '../../features/notifications/notificationsSlice';

// Components.
import Notifications from './Notifications';

// Mock axios.
jest.mock('axios');

// Mock data.
const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD' },
];

// Helper to build a test store with preloaded notifications state.
const createTestStore = ({ notifications = [] } = {}) =>
  configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState: { notifications: { notifications } },
  });

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: { notifications: mockNotifications } });
});

/******************
* COMPONENT TESTS *
******************/

test('Displays notification items from store state', () => {
  const store = createTestStore({ notifications: mockNotifications });
  const { getByText } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  expect(getByText('New course available')).toBeInTheDocument();
  expect(getByText('New resume available')).toBeInTheDocument();
  expect(getByText('Urgent requirement - complete by EOD')).toBeInTheDocument();
});

test('Adds visible class to drawer when title is clicked', () => {
  const store = createTestStore({ notifications: mockNotifications });
  const { container, getByText } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  const drawer = container.querySelector('.Notifications');
  expect(drawer.className).not.toMatch(/visible/);

  fireEvent.click(getByText('Your notifications'));
  expect(drawer.className).toMatch(/visible/);
});

test('Removes visible class from drawer when close button is clicked', () => {
  const store = createTestStore({ notifications: mockNotifications });
  const { container, getByText, getByRole } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(getByText('Your notifications'));
  const drawer = container.querySelector('.Notifications');
  expect(drawer.className).toMatch(/visible/);

  fireEvent.click(getByRole('button', { name: /close/i }));
  expect(drawer.className).not.toMatch(/visible/);
});

test('Removes a notification from the list when marked as read', () => {
  const store = createTestStore({ notifications: mockNotifications });
  const { getByText } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(getByText('New course available'));

  const remaining = store.getState().notifications.notifications;
  expect(remaining.find((n) => n.id === 1)).toBeUndefined();
  expect(remaining).toHaveLength(2);
});
