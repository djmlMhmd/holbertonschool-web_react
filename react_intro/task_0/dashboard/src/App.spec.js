import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders App component', () => {
  render(<App />);

  // Test 1: Check if h1 element with "School Dashboard" is rendered
  const h1Element = screen.getByRole('heading', { name: /School Dashboard/i });
  expect(h1Element).toBeInTheDocument();

  // Test 2: Check if img element is rendered (using alt text)
  const imgElement = screen.getByAltText(/holberton logo/i);
  expect(imgElement).toBeInTheDocument();

  // Test 3: Check text content within the 2 p elements
  // "Login to access the full dashboard"
  const loginText = screen.getByText(/Login to access the full dashboard/i);
  expect(loginText).toBeInTheDocument();

  // "Copyright {year} - holberton School"
  const copyrightText = screen.getByText(/Copyright \d{4} - holberton School/i);
  expect(copyrightText).toBeInTheDocument();
});
