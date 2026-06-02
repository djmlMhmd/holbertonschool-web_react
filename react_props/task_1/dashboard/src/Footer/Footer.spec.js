import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { getFullYear } from '../utils/utils';

describe('Footer', () => {
  it('renders the copyright text with the current year and Holberton School', () => {
    const { getByText } = render(<Footer />);
    const year = getFullYear();
    expect(getByText(`Copyright ${year} - Holberton School`)).toBeInTheDocument();
  });
});
