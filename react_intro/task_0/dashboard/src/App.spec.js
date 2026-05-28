import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders the h1 element with the text School dashboard', () => {
  render(<App />);

  const h1Element = screen.getByRole('heading', { name: /school dashboard/i });
  expect(h1Element).toBeInTheDocument();
});

test('renders the text content in the app body and footer paragraphs', () => {
  render(<App />);

  const loginText = screen.getByText(/Login to access the full dashboard/i);
  expect(loginText).toBeInTheDocument();

  const copyrightText = screen.getByText(/Copyright \d{4} - Holberton School/i);
  expect(copyrightText).toBeInTheDocument();
});

test('renders the Holberton logo image', () => {
  render(<App />);

  const imgElement = screen.getByAltText(/holberton logo/i);
  expect(imgElement).toBeInTheDocument();
});
