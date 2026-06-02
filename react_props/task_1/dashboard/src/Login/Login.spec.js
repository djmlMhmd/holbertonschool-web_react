import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { container } = render(<Login />);
    const emailLabel = container.querySelectorAll('label')[0];
    const emailInput = container.querySelector('input[type="email"]');
    const focusSpy = jest.spyOn(emailInput, 'focus');
    fireEvent.click(emailLabel);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('focuses the password input when the password label is clicked', () => {
    const { container } = render(<Login />);
    const passwordLabel = container.querySelectorAll('label')[1];
    const passwordInput = container.querySelector('input[type="password"]');
    const focusSpy = jest.spyOn(passwordInput, 'focus');
    fireEvent.click(passwordLabel);
    expect(focusSpy).toHaveBeenCalled();
  });
});
