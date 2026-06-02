import notificationsReducer, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Latest notification content</strong>'),
}));

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
        { id: 1, type: 'default', value: 'Notification 1' },
        { id: 2, type: 'urgent', value: 'Notification 2' },
        { id: 3, type: 'urgent', value: 'Notification 3' },
      ],
    };

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const actual = notificationsReducer(stateWithNotifications, markNotificationAsRead(2));

    expect(actual.notifications).toHaveLength(2);
    expect(actual.notifications.find((n) => n.id === 2)).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Marking notification 2 as read');

    consoleSpy.mockRestore();
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

  it('Should fetch notifications data correctly and set loading to false', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'urgent', value: 'Notification 3' },
    ];

    axios.get.mockResolvedValueOnce({
      data: { notifications: mockNotifications },
    });

    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;

    expect(state.loading).toBe(false);
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[2].html.__html).toBe('<strong>Latest notification content</strong>');
  });
});
