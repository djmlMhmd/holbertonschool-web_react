import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  it('has the default state values set in the constructor', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.state('isLoggedIn')).toBe(false);
    expect(wrapper.state('email')).toBe('');
    expect(wrapper.state('password')).toBe('');
    expect(wrapper.state('enableSubmit')).toBe(false);
  });

  it('renders a form with 2 labels, 2 inputs fields, and 1 submit input', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('input[type="email"]')).toHaveLength(1);
    expect(wrapper.find('input[type="password"]')).toHaveLength(1);
    expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
  });

  it('disables the submit button by default', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('updates email state when typing in the email input', () => {
    const wrapper = shallow(<Login />);

    wrapper.find('input[type="email"]').simulate('change', {
      target: { value: 'test@test.com' },
    });

    expect(wrapper.state('email')).toBe('test@test.com');
  });

  it('updates password state when typing in the password input', () => {
    const wrapper = shallow(<Login />);

    wrapper.find('input[type="password"]').simulate('change', {
      target: { value: 'password123' },
    });

    expect(wrapper.state('password')).toBe('password123');
  });

  it('enables the submit button only when email is valid and password has at least 8 characters', () => {
    const wrapper = shallow(<Login />);

    wrapper.find('input[type="email"]').simulate('change', {
      target: { value: 'invalid-email' },
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: { value: 'short' },
    });

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);

    wrapper.find('input[type="email"]').simulate('change', {
      target: { value: 'user@example.com' },
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: { value: 'password123' },
    });

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('sets isLoggedIn to true when the form is submitted', () => {
    const wrapper = shallow(<Login />);
    const preventDefault = jest.fn();

    wrapper.find('form').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(wrapper.state('isLoggedIn')).toBe(true);
  });
});
