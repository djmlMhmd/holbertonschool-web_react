/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

// Flush Promises allows simulate to finish changing component
function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

describe('<Login />', () => {
    it('renders an <Login /> component checking for App-Login', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('#Login')).toHaveLength(1);
    });

    it('renders an <Login /> component checking for input', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('div input')).toHaveLength(3);
    });

    it('renders an <Login /> component checking for label', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('div label')).toHaveLength(2);
    });

    // Test using State
    it('verifies that the submit button is disabled by default', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('form #submit').props().disabled).toBe(true);
    });

    // Mounted component, ran change events, flushed promises, updated component, and tested disabled prop
    test('verify that after changing the value of the two inputs, the button is enabled', async () => {
        const wrapper = mount(<Login />);
        const emailInput = wrapper.find({ id: 'email'});
        const pwdInput = wrapper.find({ id: 'pwd' })

        // Find the correct elements and activate their onchanges
        emailInput.simulate('change', { target: { id: 'email', value: 'john.doe@email.com' } });
        pwdInput.simulate('change', { target: { id: 'pwd', value: 'notapassword' } });
        await flushPromises;
        wrapper.update();
        expect(wrapper.find({ type: 'submit' }).props().disabled).toBe(false);
    });
});