// External libraries.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import authReducer from '../../features/auth/authSlice';

// Components.
import Login from './Login';

// Helper to build a test store.
const createTestStore = () =>
  configureStore({ reducer: { auth: authReducer } });

// Suppress Aphrodite style injection before tests.
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/******************
* COMPONENT TESTS *
******************/

test('Renders 2 labels, 2 inputs and 1 submit', () => {
  const { container } = render(
    <Provider store={createTestStore()}>
      <Login />
    </Provider>
  );

  const labels = container.querySelectorAll('label');
  const textInputs = container.querySelectorAll('input[type="email"], input[type="password"]');
  const submit = screen.getByRole('button', { name: /ok/i });

  expect(labels.length).toBe(2);
  expect(textInputs.length).toBe(2);
  expect(submit).toBeInTheDocument();
});

test('Focuses the input when its label is clicked', async () => {
  const { container } = render(
    <Provider store={createTestStore()}>
      <Login />
    </Provider>
  );
  const user = userEvent.setup();

  const emailLabel = container.querySelector('label[for="email"]');
  const emailInput = screen.getByLabelText(/email/i);

  await user.click(emailLabel);
  expect(emailInput).toHaveFocus();
});

test('Submit is disabled by default', () => {
  render(
    <Provider store={createTestStore()}>
      <Login />
    </Provider>
  );

  const submit = screen.getByRole('button', { name: /ok/i });
  expect(submit).toBeDisabled();
});

test('Submit enables only when email is valid and password has at least 8 chars', async () => {
  render(
    <Provider store={createTestStore()}>
      <Login />
    </Provider>
  );
  const user = userEvent.setup();

  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole('button', { name: /ok/i });

  await user.type(email, 'invalid');
  await user.type(password, '12345678');
  expect(submit).toBeDisabled();

  await user.clear(email);
  await user.clear(password);

  await user.type(email, 'user@example.com');
  await user.type(password, '1234567');
  expect(submit).toBeDisabled();

  await user.clear(password);
  await user.type(password, 'strongpass');
  expect(submit).toBeEnabled();
});

test('Dispatches login action with email and password on submit when form is valid', async () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const user = userEvent.setup();
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole('button', { name: /ok/i });

  await user.type(email, 'user@example.com');
  await user.type(password, 'strongpass');
  await user.click(submit);

  const state = store.getState().auth;
  expect(state.isLoggedIn).toBe(true);
  expect(state.user.email).toBe('user@example.com');
  expect(state.user.password).toBe('strongpass');
});
