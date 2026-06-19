import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login', () => {
  it('renders 2 label elements, 2 input elements, and 1 button element', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('label').length).toBe(2);
    expect(container.querySelectorAll('input').length).toBe(2);
    expect(container.querySelectorAll('button').length).toBe(1);
  });

  it('focuses the email input when the email label is clicked', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.click(screen.getByText(/email/i));
    expect(emailInput).toHaveFocus();
  });

  it('focuses the password input when the password label is clicked', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.click(screen.getByText(/password/i));
    expect(passwordInput).toHaveFocus();
  });
});
