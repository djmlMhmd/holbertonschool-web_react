import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the copyright string when getFooterCopy isIndex is true', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`copyright ${currentYear} - holberton school`, 'i')
      )
    ).toBeInTheDocument();
  });
});
