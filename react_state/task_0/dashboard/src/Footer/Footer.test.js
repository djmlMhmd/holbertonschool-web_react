import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

const wrapper = shallow(<Footer/>);

describe('<Footer />', ()=>
{
    it('render footer component', ()=>{
        shallow(<Footer/>);
        expect(wrapper.exists()).toBe(true);
    });
    it('displays copyright text', ()=>{
        expect(wrapper.text()).toContain('Copyright');
    });
}
);
