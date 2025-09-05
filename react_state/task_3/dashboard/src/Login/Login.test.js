import React from "react";
import { shallow } from "enzyme";
import Login from "./Login.js";
import { StyleSheetTestUtils } from "aphrodite";

describe("Login Composant", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("should Login renders without crashing", function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should find img in Login", function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input").length).toEqual(2);
  });

  it("should find h1 in Login", function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("label").length).toEqual(2);
  });

  it(" verify that the submit button is disabled by default", function () {
    const wrapper = shallow(<Login />);
    const submitButton = wrapper.find("button", { name: "OK" });
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("submit button is enabled after changing input values", () => {
    const wrapper = shallow(<Login />);
    wrapper
      .find('input[type="email"]')
      .simulate("change", { target: { value: "test@test.com" } });
    wrapper
      .find('input[type="password"]')
      .simulate("change", { target: { value: "password" } });
    expect(wrapper.find('input[type="submit"]').prop("disabled")).toBe(false);
  });
});
