import React from "react";
import { shallow } from "enzyme";
import BodySection from "./BodySection";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import { StyleSheetTestUtils } from "aphrodite";

describe("BodySectionWithMarginBottom Component", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
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
