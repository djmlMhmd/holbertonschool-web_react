import notificationsReducer, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');

const mockApiData = [
  {
    id: 'a1',
    author: { id: 'u1', name: { first: 'Alice', last: 'Smith' }, email: 'a@b.com', picture: '', age: 25 },
    context: { guid: 'g1', isRead: false, type: 'urgent', value: 'Urgent unread' },
  },
  {
    id: 'a2',
    author: { id: 'u2', name: { first: 'Bob', last: 'Jones' }, email: 'b@c.com', picture: '', age: 30 },
    context: { guid: 'g2', isRead: true, type: 'urgent', value: 'Urgent read (skip)' },
  },
  {
    id: 'a3',
    author: { id: 'u3', name: { first: 'Carol', last: 'Lee' }, email: 'c@d.com', picture: '', age: 28 },
    context: { guid: 'g3', isRead: false, type: 'default', value: 'Default unread' },
  },
];

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return the initial state', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Should handle markNotificationAsRead', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 'a1', type: 'urgent', isRead: false, value: 'Notification 1' },
        { id: 'a2', type: 'urgent', isRead: false, value: 'Notification 2' },
        { id: 'a3', type: 'default', isRead: false, value: 'Notification 3' },
      ],
    };

    const actual = notificationsReducer(stateWithNotifications, markNotificationAsRead('a2'));

    expect(actual.notifications).toHaveLength(2);
    expect(actual.notifications.find((n) => n.id === 'a2')).toBeUndefined();
  });

  it('Should set loading to true when fetchNotifications is pending', () => {
    const pendingAction = fetchNotifications.pending();
    const state = notificationsReducer(initialState, pendingAction);
    expect(state.loading).toBe(true);
  });

  it('Should set loading to false when fetchNotifications is rejected', () => {
    const stateWithLoading = { notifications: [], loading: true };
    const rejectedAction = fetchNotifications.rejected();
    const state = notificationsReducer(stateWithLoading, rejectedAction);
    expect(state.loading).toBe(false);
  });

  it('Should fetch only unread notifications and map to flat shape', async () => {
    axios.get.mockResolvedValueOnce({ data: mockApiData });

    const store = configureStore({ reducer: { notifications: notificationsReducer } });
    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;
    expect(state.loading).toBe(false);
    expect(state.notifications).toHaveLength(2);
    expect(state.notifications[0]).toEqual({ id: 'a1', type: 'urgent', isRead: false, value: 'Urgent unread' });
    expect(state.notifications[1]).toEqual({ id: 'a3', type: 'default', isRead: false, value: 'Default unread' });
  });
});
