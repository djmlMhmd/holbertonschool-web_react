import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

describe('<Notifications />', () => {
  const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a menu item', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('#menuItem')).toHaveLength(1);
  });

  it('does not display the notifications panel when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('[aria-label="Close"]')).toHaveLength(0);
  });

  it('displays the notifications panel when displayDrawer is true', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    expect(wrapper.find('[aria-label="Close"]')).toHaveLength(1);
  });

  it('renders a list of 3 notification items', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it('renders the text "No new notification for now" when the list is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer listNotifications={[]} />);
    expect(wrapper.contains(<p>No new notification for now</p>)).toBe(true);
  });

  it('calls handleDisplayDrawer when clicking on the menu item', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} />
    );

    wrapper.find('#menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when clicking on the close button', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer
        listNotifications={listNotifications}
        handleHideDrawer={handleHideDrawer}
      />
    );

    wrapper.find('[aria-label="Close"]').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  it('does not rerender when updating with the same list length and same displayDrawer', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({
      displayDrawer: true,
      listNotifications,
    });

    expect(shouldUpdate).toBe(false);
  });

  it('rerenders when displayDrawer changes', () => {
    const wrapper = shallow(<Notifications listNotifications={listNotifications} />);
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({
      displayDrawer: true,
      listNotifications,
    });

    expect(shouldUpdate).toBe(true);
  });
});
