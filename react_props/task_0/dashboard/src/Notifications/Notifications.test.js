import React from 'react';
import { render } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('renders without crashing', () => {
    const { container } = render(<Notifications />);
    expect(container).toBeTruthy();
  });
});
