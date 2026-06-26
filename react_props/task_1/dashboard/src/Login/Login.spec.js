import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login', () => {
  it('contains 2 labels, 2 inputs, and 1 button', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('button')).toHaveLength(1);
  });

  it('focuses the email input when the email label is clicked', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.click(screen.getByText('Email:'));
    expect(emailInput).toHaveFocus();
  });

  it('focuses the password input when the password label is clicked', async () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.click(screen.getByText('Password:'));
    expect(passwordInput).toHaveFocus();
  });
});
