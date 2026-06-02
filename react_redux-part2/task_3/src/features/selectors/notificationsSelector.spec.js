import { getFilteredNotifications } from './notificationsSelector';

const notifications = [
  { id: '1', type: 'urgent', isRead: false, value: 'Urgent A' },
  { id: '2', type: 'default', isRead: false, value: 'Default B' },
  { id: '3', type: 'urgent', isRead: false, value: 'Urgent C' },
];

const makeState = (list) => ({ notifications: { notifications: list } });

describe('getFilteredNotifications', () => {
  it('returns all notifications when filter is "all"', () => {
    expect(getFilteredNotifications(makeState(notifications), 'all')).toHaveLength(3);
  });

  it('returns only urgent notifications when filter is "urgent"', () => {
    const result = getFilteredNotifications(makeState(notifications), 'urgent');
    expect(result).toHaveLength(2);
    expect(result.every((n) => n.type === 'urgent')).toBe(true);
  });

  it('returns only default notifications when filter is "default"', () => {
    const result = getFilteredNotifications(makeState(notifications), 'default');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('default');
  });
});
