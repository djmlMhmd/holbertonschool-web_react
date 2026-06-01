// External libraries.
import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';

// Component.
import NotificationItem from './NotificationItem';

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

/******************
* COMPONENT TESTS *
******************/

test('Renders default type notification with blue styling indicator', () => {
  const { container } = render(
    <table>
      <tbody>
        <NotificationItem type="default" value="New course available" id={1} markAsRead={() => {}} />
      </tbody>
    </table>
  );

  const li = container.querySelector('li');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('New course available');
  expect(li).toHaveAttribute('data-notification-type', 'default');
});

test('Renders urgent type notification with red styling indicator', () => {
  const { container } = render(
    <table>
      <tbody>
        <NotificationItem type="urgent" value="New resume available" id={2} markAsRead={() => {}} />
      </tbody>
    </table>
  );

  const li = container.querySelector('li');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('New resume available');
  expect(li).toHaveAttribute('data-notification-type', 'urgent');
});
