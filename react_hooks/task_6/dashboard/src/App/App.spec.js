import React from 'react';
import mockAxios from 'jest-mock-axios';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App.jsx';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('act(...)')) return;
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

describe('App Component Tests', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('Renders all main components', async () => {
    render(<App />);

    await act(async () => {
      mockAxios.mockResponse({ data: mockNotifications });
    });

    expect(screen.getByText(/school dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('Login displays course list and hides login form', async () => {
    render(<App />);
    const user = userEvent.setup();

    await act(async () => {
      mockAxios.mockResponse({ data: [] });
    });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument());
    expect(screen.queryByRole('heading', { name: /log in to continue/i })).not.toBeInTheDocument();
  });

  test('Logout works correctly', async () => {
    render(<App />);
    const user = userEvent.setup();

    await act(async () => {
      mockAxios.mockResponse({ data: [] });
    });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => expect(screen.getByText('logout')).toBeInTheDocument());
    await user.click(screen.getByText('logout'));

    await waitFor(() => expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument());
  });

  test('Notifications are loaded from API', async () => {
    render(<App />);

    expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json');

    await act(async () => {
      mockAxios.mockResponse({ data: mockNotifications });
    });

    await waitFor(() => expect(screen.getByText('New course available')).toBeInTheDocument());
  });

  test('Courses are fetched after login', async () => {
    render(<App />);
    const user = userEvent.setup();

    await act(async () => {
      mockAxios.mockResponse({ data: [] });
    });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    expect(mockAxios.get).toHaveBeenCalledWith('/courses.json');

    await act(async () => {
      mockAxios.mockResponse({ data: mockCourses });
    });

    await waitFor(() => expect(screen.getByText('ES6')).toBeInTheDocument());
  });
});

describe('Keyboard events', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('Ctrl+H logs out user', async () => {
    render(<App />);
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      mockAxios.mockResponse({ data: [] });
    });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument());

    await act(async () => {
      const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
      document.dispatchEvent(event);
    });

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Logging you out'));
    await waitFor(() => expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument());

    alertMock.mockRestore();
  });
});
