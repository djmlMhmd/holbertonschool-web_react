import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a div with class App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App').length).toBe(1);
  });

  it('renders the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications').length).toBe(1);
  });

  it('renders the login paragraph', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App-body p').text()).toContain('Login to access the full dashboard');
  });

  it('renders the header with school dashboard title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App-header h1').text()).toBe('School dashboard');
  });
});
