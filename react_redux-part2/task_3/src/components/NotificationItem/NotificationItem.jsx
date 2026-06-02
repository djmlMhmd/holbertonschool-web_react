// External libraries.
import { memo } from 'react';

const NotificationItem = memo(({ type = 'default', value, id, markAsRead }) => {
  const color = type === 'urgent' ? 'red' : 'blue';

  return (
    <li
      style={{ color, cursor: 'pointer' }}
      data-notification-type={type}
      onClick={() => markAsRead && markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
