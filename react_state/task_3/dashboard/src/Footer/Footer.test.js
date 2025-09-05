import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";
import { getFullYear, getFooterCopy } from "../utils/utils";

describe("Footer", () => {
  it("renders without crashing", () => {
    shallow(<Footer />);
  });

  it("displays the correct copyright text", () => {
    const wrapper = shallow(<Footer />).dive();
    const currentYear = getFullYear();
    const footerText = getFooterCopy(true);
    const expectedText = `Copyright ${currentYear} - ${footerText}`;
    expect(wrapper.find("p").text()).toEqual(expectedText);
  });

  it("does not display the 'Contact us' text when user is not logged in", () => {
    const wrapper = shallow(<Footer />);
    wrapper.setProps({ user: { isLoggedIn: false } });
    expect(wrapper.find(".ContactUs").exists()).toBe(false);
  });
});
