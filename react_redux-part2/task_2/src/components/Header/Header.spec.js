// External libraries.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import authReducer, { login } from '../../features/auth/authSlice';

// Component.
import Header from './Header';

// Helper to build a test store.
const createTestStore = (initialAuth = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { isLoggedIn: false, user: { email: '', password: '' }, ...initialAuth },
    },
  });

// Suppress Aphrodite style injection.
beforeAll(() => StyleSheetTestUtils.suppressStyleInjection());
afterAll(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());

/******************
* COMPONENT TESTS *
******************/

test('Displays logout link when isLoggedIn is true', () => {
  render(
    <Provider store={createTestStore({ isLoggedIn: true, user: { email: 'user@test.com', password: '' } })}>
      <Header />
    </Provider>
  );

  expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
});

test('Displays welcome message with user email after login action is dispatched', () => {
  const store = createTestStore();
  store.dispatch(login({ email: 'hello@school.com', password: 'secret' }));

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(screen.getByText('hello@school.com')).toBeInTheDocument();
});

test('Sets isLoggedIn to false after logout action is dispatched', async () => {
  const store = createTestStore({
    isLoggedIn: true,
    user: { email: 'user@test.com', password: '' },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole('link', { name: /logout/i }));

  expect(store.getState().auth.isLoggedIn).toBe(false);
});
