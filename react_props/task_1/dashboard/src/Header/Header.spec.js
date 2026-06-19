import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  it('renders the Holberton logo image', () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  it('renders an h1 heading element with the text School dashboard', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: /school dashboard/i })
    ).toBeInTheDocument();
  });
});
