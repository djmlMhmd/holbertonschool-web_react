import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Login />);
    expect(container).toBeTruthy();
  });

  it('renders inputs and labels', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('label')).toHaveLength(2);
  });
});
