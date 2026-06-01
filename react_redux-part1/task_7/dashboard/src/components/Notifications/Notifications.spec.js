// External libraries.
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import notificationsReducer from '../../features/notifications/notificationsSlice';

// Components.
import Notifications from './Notifications';

// Utils.
import { getLatestNotification } from "../../utils/utils";

// Mock axios.
jest.mock('axios');
import axios from 'axios';

// Mock data.
const mockNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", value: getLatestNotification() }
];

// Helper to build a test store with preloaded notifications state.
const createTestStore = ({ notifications = [], displayDrawer = false } = {}) =>
  configureStore({
    reducer: { notifications: notificationsReducer },
    preloadedState: { notifications: { notifications, displayDrawer } },
  });

// Suppress Aphrodite style injection before tests.
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/*********************
* FETCH + STATE TEST *
*********************/

test('Fetches notifications on mount and updates the store', async () => {
  axios.get.mockResolvedValue({ data: { notifications: mockNotifications } });

  const store = createTestStore({ notifications: [], displayDrawer: false });
  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  await waitFor(() => {
    const state = store.getState().notifications;
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[0].value).toBe('New course available');
    expect(state.notifications[1].value).toBe('New resume available');
  });
});

/******************
* COMPONENT TESTS *
******************/

test('Renders 3 notification items with appropriate text', () => {
  const { getByText, container } = render(
    <Provider store={createTestStore({ notifications: mockNotifications, displayDrawer: true })}>
      <Notifications />
    </Provider>
  );

  expect(getByText('New course available')).toBeInTheDocument();
  expect(getByText('New resume available')).toBeInTheDocument();
  const notificationItems = container.querySelectorAll('li');
  expect(notificationItems).toHaveLength(3);
});

test('Renders with empty notifications array by default', () => {
  const { container } = render(
    <Provider store={createTestStore()}>
      <Notifications />
    </Provider>
  );
  const notificationItems = container.querySelectorAll('li');
  expect(notificationItems).toHaveLength(0);
});

test('Always displays "Your notifications" title', () => {
  const { getByText } = render(
    <Provider store={createTestStore()}>
      <Notifications />
    </Provider>
  );
  expect(getByText('Your notifications')).toBeInTheDocument();
});

test('Does not display drawer elements when displayDrawer is false', () => {
  const { queryByText, queryByRole, container, getByText } = render(
    <Provider store={createTestStore({ notifications: mockNotifications, displayDrawer: false })}>
      <Notifications />
    </Provider>
  );

  expect(getByText('Your notifications')).toBeInTheDocument();
  expect(queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  expect(container.querySelectorAll('li')).toHaveLength(0);
  expect(queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
});

test('Displays list, paragraph and close button when displayDrawer is true', () => {
  const { getByText, getByRole, container } = render(
    <Provider store={createTestStore({ notifications: mockNotifications, displayDrawer: true })}>
      <Notifications />
    </Provider>
  );

  expect(getByText('Your notifications')).toBeInTheDocument();
  expect(getByText('Here is the list of notifications')).toBeInTheDocument();
  expect(container.querySelectorAll('li')).toHaveLength(3);
  expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
});

test('Displays "No new notifications for now" when displayDrawer is true and no notifications', () => {
  const { getByText, getByRole, queryAllByRole } = render(
    <Provider store={createTestStore({ notifications: [], displayDrawer: true })}>
      <Notifications />
    </Provider>
  );

  expect(getByText('Your notifications')).toBeInTheDocument();
  expect(getByText('No new notifications for now')).toBeInTheDocument();
  expect(queryAllByRole('listitem')).toHaveLength(0);
  expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
});

/********************
* INTERACTION TESTS *
********************/

test('Dispatches markNotificationAsRead with correct id when clicking on first notification', () => {
  const store = createTestStore({ notifications: mockNotifications, displayDrawer: true });
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

test('Dispatches markNotificationAsRead with correct id when clicking on second notification', () => {
  const store = createTestStore({ notifications: mockNotifications, displayDrawer: true });
  const { getByText } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(getByText('New resume available'));

  const remaining = store.getState().notifications.notifications;
  expect(remaining.find((n) => n.id === 2)).toBeUndefined();
  expect(remaining).toHaveLength(2);
});

test('Dispatches markNotificationAsRead with correct id when clicking on third notification (li)', () => {
  const store = createTestStore({ notifications: mockNotifications, displayDrawer: true });
  const { container } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  const notificationItems = container.querySelectorAll('li');
  fireEvent.click(notificationItems[2]);

  const remaining = store.getState().notifications.notifications;
  expect(remaining.find((n) => n.id === 3)).toBeUndefined();
  expect(remaining).toHaveLength(2);
});

test('Dispatches showDrawer when clicking on the menu item', () => {
  const store = createTestStore({ notifications: mockNotifications, displayDrawer: false });
  const { getByText } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(getByText('Your notifications'));

  expect(store.getState().notifications.displayDrawer).toBe(true);
});

test('Dispatches hideDrawer when clicking on the close button', () => {
  const store = createTestStore({ notifications: mockNotifications, displayDrawer: true });
  const { getByRole } = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  fireEvent.click(getByRole('button', { name: /close/i }));

  expect(store.getState().notifications.displayDrawer).toBe(false);
});
