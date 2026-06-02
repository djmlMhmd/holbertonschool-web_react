// External libraries.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import authReducer from '../../features/auth/authSlice';

// Component.
import Login from './Login';

// Helper to build a test store.
const createTestStore = () =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { isLoggedIn: false, user: { email: '', password: '' } } },
  });

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

/******************
* COMPONENT TESTS *
******************/

test('Renders the login form with email, password fields and submit button', () => {
  render(
    <Provider store={createTestStore()}>
      <Login />
    </Provider>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('Sets isLoggedIn to true after submitting valid credentials', async () => {
  const store = createTestStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), 'user@example.com');
  await user.type(screen.getByLabelText(/password/i), 'strongpass');
  await user.click(screen.getByRole('button', { name: /ok/i }));

  expect(store.getState().auth.isLoggedIn).toBe(true);
  expect(store.getState().auth.user.email).toBe('user@example.com');
});

test('Keeps isLoggedIn false when credentials are invalid', async () => {
  const store = createTestStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), 'notanemail');
  await user.type(screen.getByLabelText(/password/i), 'short');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  expect(submitButton).toBeDisabled();
  expect(store.getState().auth.isLoggedIn).toBe(false);
});
