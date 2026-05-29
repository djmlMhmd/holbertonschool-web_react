import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a div with class Notifications', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('.Notifications').length).toBe(1);
  });

  it('renders the text "Here is the list of notifications"', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('p').text()).toBe('Here is the list of notifications');
  });

  it('renders 3 list items', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('li').length).toBe(3);
  });

  it('renders a close button', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('button[aria-label="Close"]').length).toBe(1);
  });
});
