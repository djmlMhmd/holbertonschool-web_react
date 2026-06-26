import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { getFullYear, getFooterCopy } from '../utils/utils';

describe('Footer', () => {
  it('renders the correct copyright string when isIndex is true', () => {
    render(<Footer />);
    expect(
      screen.getByText(`Copyright ${getFullYear()} - ${getFooterCopy(true)}`)
    ).toBeInTheDocument();
  });
});
