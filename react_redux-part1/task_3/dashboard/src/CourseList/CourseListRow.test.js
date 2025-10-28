import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

describe('<CourseListRow />', () => {
    it('renders an <CourseListRow /> component', () => {
        const wrapper = shallow(<CourseListRow />);
        expect(wrapper).toHaveLength(1);
    });

	it('renders a <CourseListRow /> component with isHeader set to true and textSecondCell === null', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} />);
        expect(wrapper.find('th')).toHaveLength(1);
        expect(wrapper.find('th').get(0).props.colSpan).toEqual(2);
    });

    it('tests the component renders two cells when textSecondCell is present', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textSecondCell="Holberton Second"/>);
        expect(wrapper.find('th')).toHaveLength(2);
    });

    it('tests the component renders correctly two td elements within a tr element when isHeader is false', () => {
        const wrapper = shallow(<CourseListRow isHeader={false} />);
        expect(wrapper.find('tr td')).toHaveLength(2);
    })
});