import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  it('renders the Holberton logo img element', () => {
    const { container } = render(<Header />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
  });

  it('renders an h1 element with the text "School dashboard"', () => {
    const { container } = render(<Header />);
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('School dashboard');
  });
});
