import React from "react";
import { shallow } from "enzyme";
import Header from "./Header.jsx";
import { StyleSheetTestUtils } from "aphrodite";

describe("Header Composant", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("should Header renders without crashing", function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should find img in Header", function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("img"));
  });

  it("should find h1 in Header", function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("h1"));
  });

  it("should not render logoutSection when user is not logged in", function () {
    const contextValue = {
      user: {
        isLoggedIn: false,
        email: "",
      },
      logOut: jest.fn(),
    };
    const wrapper = shallow(<Header />, {
      context: { AppContext: contextValue },
    });
    expect(wrapper.find("#logoutSection")).toHaveLength(0);
  });

  it("should render logoutSection when user is logged in", function () {
    const contextValue = {
      user: {
        isLoggedIn: true,
        email: "test@example.com",
      },
      logOut: jest.fn(),
    };
    const wrapper = shallow(<Header />, {
      context: { AppContext: contextValue },
    });
    expect(wrapper.find("#logoutSection")).toHaveLength(1);
  });

  it("should call logOut when logout link is clicked", function () {
    const contextValue = {
      user: {
        isLoggedIn: true,
        email: "test@example.com",
      },
      logOut: jest.fn(),
    };
    const wrapper = shallow(<Header />, {
      context: { AppContext: contextValue },
    });
    wrapper.find("#logoutSection a").simulate("click");
    expect(contextValue.logOut).toHaveBeenCalled();
  });
});
