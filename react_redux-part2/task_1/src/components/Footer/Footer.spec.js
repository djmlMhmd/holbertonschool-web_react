// External libraries.
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Reducers.
import authReducer from '../../features/auth/authSlice';

// Component.
import Footer from './Footer';

// Helper to build a test store.
const createTestStore = (isLoggedIn = false) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { isLoggedIn, user: { email: '', password: '' } } },
  });

/******************
* COMPONENT TESTS *
******************/

test('Displays copyright text with current year and school name', () => {
  render(
    <Provider store={createTestStore()}>
      <Footer />
    </Provider>
  );

  expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  expect(screen.getByText(/holberton school/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument();
});

test('Displays "Contact us" link when isLoggedIn is true', () => {
  render(
    <Provider store={createTestStore(true)}>
      <Footer />
    </Provider>
  );

  expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
});

test('Does not display "Contact us" link when isLoggedIn is false', () => {
  render(
    <Provider store={createTestStore(false)}>
      <Footer />
    </Provider>
  );

  expect(screen.queryByRole('link', { name: /contact us/i })).not.toBeInTheDocument();
});
