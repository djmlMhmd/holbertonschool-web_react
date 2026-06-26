import React from 'react';
import { shallow } from 'enzyme';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('renders the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('renders the Login component when isLoggedIn is false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  it('renders the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('renders the CourseList component when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn />);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it('has a default state of displayDrawer set to false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('updates displayDrawer to true after calling handleDisplayDrawer', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toBe(true);
  });

  it('updates displayDrawer to false after calling handleHideDrawer', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('shows and hides the notifications panel when clicking the menu item and close button', () => {
    render(<App />);

    expect(screen.queryByText('Here is the list of notifications')).toBeNull();

    fireEvent.click(screen.getByText('Your notifications'));
    expect(screen.getByText('Here is the list of notifications')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Here is the list of notifications')).toBeNull();
  });
});
