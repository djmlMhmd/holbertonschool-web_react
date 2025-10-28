import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import { StyleSheetTestUtils } from 'aphrodite';
import { loggedInContext, defaultUser } from '../utils/utils';
import { AppContext } from '../App/AppContext';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

describe('<Footer />', () => {
    it('renders an <Footer /> component', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper).toHaveLength(1);
    });

    it('renders an <Footer /> component checking for App-Footer', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('div p').text()).toContain('Copyright');
    });

    it('verifies that the link is displayed when the user is logged in within the context', () => {
        const wrapper = mount(<AppContext.Provider value={ loggedInContext }><Footer /></AppContext.Provider>);
        expect(wrapper.find('div a')).toHaveLength(1);
    });

    it('verifies that the link is not displayed when the user is not logged in within the context', () => {
        const wrapper = mount(<AppContext.Provider value={ defaultUser }><Footer /></AppContext.Provider>);
        expect(wrapper.find('div a')).toHaveLength(0);
    });
});