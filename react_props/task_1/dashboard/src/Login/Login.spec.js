import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('contains 2 labels, 2 inputs, and 1 button', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('button')).toHaveLength(1);
  });

  it('focuses the email input when its label is clicked', () => {
    const { container } = render(<Login />);
    const emailLabel = container.querySelectorAll('label')[0];
    const emailInput = container.querySelector('input[type="email"]');
    fireEvent.click(emailLabel);
    expect(document.activeElement).toBe(emailInput);
  });

  it('focuses the password input when its label is clicked', () => {
    const { container } = render(<Login />);
    const passwordLabel = container.querySelectorAll('label')[1];
    const passwordInput = container.querySelector('input[type="password"]');
    fireEvent.click(passwordLabel);
    expect(document.activeElement).toBe(passwordInput);
  });
});
