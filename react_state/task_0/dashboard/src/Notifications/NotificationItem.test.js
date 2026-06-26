import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

//import Enzyme from 'enzyme';
//import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//Enzyme.configure({ adapter: new Adapter() });


describe('NotificationItem', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });
  test('renders with correct type and value', () => {
    const wrapper = shallow(<NotificationItem type='default' value='test' />);
    const li = wrapper.find('li');

    expect(li.prop('data-notification-type')).toBe('default');
    expect(li.text()).toBe('test');
  });

  test('renders with correct inner html', () => {
    const wrapper = shallow(<NotificationItem html={{ __html: '<u>test</u>' }} />);
    
    expect(wrapper.html()).toContain('<u>test</u>');
  });
  it(" markAsRead is being called with the right message", () => {
    const id = 1;

    const wrapper = shallow(
      <NotificationItem type="default" value="test" id={id} />
    );

    const instance = wrapper;

    instance.markAsRead = jest.fn();

    const listItem = wrapper.find("li").first();

    listItem.simulate("click");

    instance.markAsRead(id);

    expect(instance.markAsRead).toHaveBeenCalledWith(1);
    jest.restoreAllMocks();
  });
});
