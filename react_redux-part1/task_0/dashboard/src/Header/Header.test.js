import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext } from '../App/AppContext';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

// A default user that is logged in
const loggedInContext = { user: { email: 'ziggy@mail.com', password: 'ziggy', isLoggedIn: true }, logOut: () => { } };

describe('<Header />', () => {
    it('renders an <Header /> component', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper).toHaveLength(1);
    });

    it('renders an <Header /> component checking for img', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('#Header img')).toHaveLength(1);
    });

    it('renders an <Header /> component checking for heading', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('#Header h1')).toHaveLength(1);
    });

    // Mounts Header with default context
    it('mounts Header with default ctx and verifies that the logOutSection isn\'t created', () => {
        const wrapper = shallow(<Header />, AppContext);
        expect(wrapper.find('#logoutSection')).toHaveLength(0);
    });

    // Mounts Header with context containing an active user
    it('mounts Header component with a user defined, verifying the logoutSection is created', () => {
        const wrapper = mount(<AppContext.Provider value={ loggedInContext }><Header /></AppContext.Provider>);
        expect(wrapper.find('#logoutSection')).toHaveLength(1);
    });

    // Make sure that the spy is set before the wrapper.
    it('mounts Header component with a user defined, verifying clicking the (logout) link calls logOut()', () => {
        const spy = jest.spyOn(loggedInContext, 'logOut');
        const wrapper = mount(<AppContext.Provider value={ loggedInContext }><Header /></AppContext.Provider>);
        wrapper.find('#logoutSection a').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});