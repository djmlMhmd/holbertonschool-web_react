import React from "react";
import { shallow } from "enzyme";
import BodySection from "./BodySection";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import { StyleSheetTestUtils } from "aphrodite";

describe("BodySection Component", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("should render correctly the children and one h2 element", function () {
    const title = "test title";
    const childrenText = "test children node";
    const wrapper = shallow(
      <BodySection title={title}>
        <p>{childrenText}</p>
      </BodySection>
    );

    expect(wrapper.find("h2").text()).toEqual(title);
    expect(wrapper.find("p").text()).toEqual(childrenText);
  });

  it("renders BodySection component and passes props correctly", () => {
    const title = "test title";
    const childrenText = "test children node";
    const wrapper = shallow(
      <BodySectionWithMarginBottom title={title}>
        <p>{childrenText}</p>
      </BodySectionWithMarginBottom>
    );

    const bodySection = wrapper.find(BodySection);

    expect(bodySection.exists()).toBeTruthy();

    expect(bodySection.props().title).toEqual(title);
    expect(bodySection.props().children).toEqual(<p>{childrenText}</p>);
  });
});
