import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('contains the Holberton logo image', () => {
    const { container } = render(<Header />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('contains an h1 element with the correct text', () => {
    const { getByRole } = render(<Header />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('School dashboard');
  });
});
