import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('renders a button element', () => {
    const { container } = render(<Notifications />);
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
  });

  it('renders a list of 3 notification items', () => {
    const { container } = render(<Notifications />);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(3);
  });
});
