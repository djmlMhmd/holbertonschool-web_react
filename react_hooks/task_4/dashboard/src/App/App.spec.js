import React from 'react';
import App from './App.jsx';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StyleSheetTestUtils } from 'aphrodite';
import mockAxios from 'jest-mock-axios';
import { getLatestNotification } from '../utils/utils';

const mockNotificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: '' },
];

const mockCoursesData = [
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

// Resolve both initial axios requests (notifications + courses)
const resolveInitialRequests = async () => {
  await act(async () => {
    mockAxios.mockResponse({ data: mockNotificationsData });
    mockAxios.mockResponse({ data: mockCoursesData });
  });
};

describe('App Component Tests', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('Renders Notifications component', () => {
    render(<App />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('Renders Header component', () => {
    render(<App />);
    expect(screen.getByText(/school dashboard/i)).toBeInTheDocument();
  });

  test('Renders Login component by default (not logged in)', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /course list/i })).not.toBeInTheDocument();
  });

  test('Renders Footer component', () => {
    render(<App />);
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  });

  test('Displays News from the School section by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

  test('After a successful login, Course list is displayed and Login disappears', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
    });

    expect(screen.queryByRole('heading', { name: /log in to continue/i })).not.toBeInTheDocument();
  });

  test('After login, the Header shows logoutSection with user email', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByText('(logout)')).toBeInTheDocument();
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });

  test('Clicking on Header logout link logs the user out and UI returns to Login', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByText('(logout)')).toBeInTheDocument();
    });

    await user.click(screen.getByText('(logout)'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
    });
  });

  test('Clicking on a notification item removes it from the list', async () => {
    render(<App />);
    const user = userEvent.setup();

    await resolveInitialRequests();

    await waitFor(() => {
      expect(screen.getByText('New course available')).toBeInTheDocument();
    });

    await user.click(screen.getByText('New course available'));

    await waitFor(() => {
      expect(screen.queryByText('New course available')).not.toBeInTheDocument();
    });
  });

  test('Clicking on a notification logs the expected message with the ID', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    const user = userEvent.setup();

    await resolveInitialRequests();

    await waitFor(() => {
      expect(screen.getByText('New resume available')).toBeInTheDocument();
    });

    await user.click(screen.getByText('New resume available'));

    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    consoleSpy.mockRestore();
  });
});

describe('handleDisplayDrawer and handleHideDrawer', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('handleHideDrawer closes the notification drawer when close button is clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  test('handleDisplayDrawer shows the notification drawer when notification title is clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    await user.click(screen.getByText(/your notifications/i));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });
});

describe('logIn state mutations', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('logIn sets isLoggedIn to true and shows the course list', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /log in to continue/i })).not.toBeInTheDocument();
    });
  });

  test('logIn updates user email which is displayed in the header', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});

describe('logOut state mutations', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('logOut sets isLoggedIn to false and shows the Login form', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByText('(logout)')).toBeInTheDocument();
    });

    await user.click(screen.getByText('(logout)'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /course list/i })).not.toBeInTheDocument();
    });
  });

  test('logOut clears email from user state (no email shown in header)', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => {
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });

    await user.click(screen.getByText('(logout)'));

    await waitFor(() => {
      expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
    });
  });
});

describe('Data Fetching', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.clearAllMocks();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    mockAxios.reset();
  });

  test('fetches notifications data when the component initially renders', async () => {
    render(<App />);

    // Verify axios.get was called for notifications on mount
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');

    // Simulate server response
    await act(async () => {
      mockAxios.mockResponse({ data: mockNotificationsData });
    });

    // Resolve the initial courses request as well
    await act(async () => {
      mockAxios.mockResponse({ data: [] });
    });

    // Notifications drawer is open (displayDrawer=true) — items should be visible
    await waitFor(() => {
      expect(screen.getByText('New course available')).toBeInTheDocument();
      expect(screen.getByText('New resume available')).toBeInTheDocument();
    });
  });

  test('fetches notifications and applies getLatestNotification() to id 3', async () => {
    render(<App />);

    await act(async () => {
      mockAxios.mockResponse({ data: mockNotificationsData });
    });
    await act(async () => {
      mockAxios.mockResponse({ data: [] });
    });

    await waitFor(() => {
      // Notification 3 should have HTML from getLatestNotification()
      const latestText = 'Urgent requirement';
      expect(screen.getByText((content, element) =>
        element && element.tagName === 'LI' && element.innerHTML.includes(latestText)
      )).toBeInTheDocument();
    });
  });

  test('fetches courses data whenever the user authentication state changes', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Resolve initial requests (notifications + initial courses fetch)
    await act(async () => {
      mockAxios.mockResponse({ data: [] }); // notifications (empty for this test)
      mockAxios.mockResponse({ data: [] }); // initial courses
    });

    // Verify the initial courses request was made
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');

    // Log in — this changes user.isLoggedIn and triggers the courses effect again
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    // Simulate server response for courses after login
    await act(async () => {
      mockAxios.mockResponse({ data: mockCoursesData });
    });

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument();
      expect(screen.getByText('Webpack')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  test('courses fetch is triggered again after logout (user state change)', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Resolve initial requests
    await act(async () => {
      mockAxios.mockResponse({ data: [] }); // notifications
      mockAxios.mockResponse({ data: [] }); // initial courses
    });

    // Login
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await act(async () => {
      mockAxios.mockResponse({ data: mockCoursesData });
    });

    await waitFor(() => {
      expect(screen.getByText('(logout)')).toBeInTheDocument();
    });

    // Logout — user.isLoggedIn changes to false, triggering another courses fetch
    await user.click(screen.getByText('(logout)'));

    // courses.json is called again
    const coursesCalls = mockAxios.get.mock.calls.filter(
      call => call[0] === 'http://localhost:5173/courses.json'
    );
    expect(coursesCalls.length).toBeGreaterThanOrEqual(2);
  });
});
