import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

const htmlObj = getLatestNotification();

const listNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: htmlObj },
];

describe('<Notifications />', () => {
    it('renders an <Notifications /> component', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper).toHaveLength(1);
    });

    it('does display the menuItem when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={ false } />);
        expect(wrapper.find('#menuItem')).toHaveLength(1);
    });

    it('does not display div#Notifications when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={ false } />);
        expect(wrapper.find('#Notifications')).toHaveLength(0);
    });

    it('does display the menuItem when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('#menuItem')).toHaveLength(0);
    });

    it('does not display div#Notifications when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('#Notifications')).toHaveLength(1);
    });

    it('renders an <Notifications /> component checking for 3 NotificationItems', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        // console.log(wrapper.debug());

        expect(wrapper.find('#Notifications ul Memo(NotificationItem)')).toHaveLength(3);
    });

    it('verifies that Notifications renders correctly if you pass an empty array or without the listNotifications prop', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('#Notifications')).toHaveLength(1);
        const wrapperTwo = shallow(<Notifications displayDrawer={ true } listNotifications={ [] } />);
        expect(wrapper.find('#Notifications')).toHaveLength(1);
    });

    it('verifies that when you pass a list of notifications, the component renders it correctly and with the right number of NotificationItem', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
        expect(wrapper.find(NotificationItem)).toHaveLength(3);
    });

    it('verifies that Notifications renders correctly if you pass an empty array or without the listNotifications prop', () => {
        const wrapper = shallow(<Notifications displayDrawer={ true } />);
        expect(wrapper.find('#Notifications p').text()).not.toEqual('Here is the list of notifications');
        expect(wrapper.find('#Notifications p').text()).toEqual('No new notification for now');
    });

    // handleDisplayDrawer
    it('verifies that clicking on the menu item calls handleDisplayDrawer', () => {
        const mockHandleDisplayDrawer = jest.fn();
        const wrapper = shallow(<Notifications listNotifications={listNotifications} handleDisplayDrawer={mockHandleDisplayDrawer} />);
        const spy = jest.spyOn(wrapper.instance().props, 'handleDisplayDrawer');
        wrapper.find('div').simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    // handleHideDrawer
    it('verifies that clicking on the button calls handleHideDrawer', () => {
        const mockHandleHideDrawer = jest.fn();
        const wrapper = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } handleHideDrawer={ mockHandleHideDrawer } />);
        const spy = jest.spyOn(wrapper.instance().props, 'handleHideDrawer');
        wrapper.find('div button').simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    })
});