import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { getFullYear, getFooterCopy } from '../utils/utils';

describe('Footer', () => {
  it('renders the correct copyright string when getFooterCopy isIndex is true', () => {
    const { container } = render(<Footer />);
    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe(`Copyright ${getFullYear()} - ${getFooterCopy(true)}`);
  });
});
