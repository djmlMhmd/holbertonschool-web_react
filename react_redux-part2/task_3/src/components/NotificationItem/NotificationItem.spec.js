// External libraries.
import { render, fireEvent } from '@testing-library/react';

// Component.
import NotificationItem from './NotificationItem';

const renderItem = (props) =>
  render(<ul><NotificationItem {...props} /></ul>);

/******************
* COMPONENT TESTS *
******************/

test('Renders default type notification with blue color', () => {
  const { container } = renderItem({
    type: 'default',
    value: 'New course available',
    id: '1',
    markAsRead: () => {},
  });

  const li = container.querySelector('li');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('New course available');
  expect(li).toHaveAttribute('data-notification-type', 'default');
  expect(li.style.color).toBe('blue');
});

test('Renders urgent type notification with red color', () => {
  const { container } = renderItem({
    type: 'urgent',
    value: 'New resume available',
    id: '2',
    markAsRead: () => {},
  });

  const li = container.querySelector('li');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('New resume available');
  expect(li).toHaveAttribute('data-notification-type', 'urgent');
  expect(li.style.color).toBe('red');
});

test('Calls markAsRead with correct id when clicked', () => {
  const markAsRead = jest.fn();
  const { container } = renderItem({
    type: 'default',
    value: 'Click me',
    id: '42',
    markAsRead,
  });

  fireEvent.click(container.querySelector('li'));
  expect(markAsRead).toHaveBeenCalledWith('42');
});
