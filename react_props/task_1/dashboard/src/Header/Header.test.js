import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeTruthy();
  });

  it('renders img and h1', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('h1')).toBeInTheDocument();
  });
});
