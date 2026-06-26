import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  it('contains the Holberton logo', () => {
    render(<Header />);
    expect(screen.getByAltText('Holberton logo')).toBeInTheDocument();
  });

  it('contains an h1 element with the text School dashboard', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(screen.getByText('School dashboard')).toBeInTheDocument();
  });
});
