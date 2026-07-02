import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders the h1 element with the text School Dashboard', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /school dashboard/i })
    ).not.toBeNull();
  });

  it('renders the expected text in the body and footer paragraphs', () => {
    render(<App />);

    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).not.toBeNull();

    expect(
      screen.getByText(
        new RegExp(`copyright ${new Date().getFullYear()} - holberton school`, 'i')
      )
    ).not.toBeNull();
  });

  it('renders the Holberton logo image', () => {
    render(<App />);

    expect(screen.getByAltText(/holberton logo/i)).not.toBeNull();
  });
});
