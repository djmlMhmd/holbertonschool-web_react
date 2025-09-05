import React from "react";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

describe("CourseListRow Composant Tesy when header is True", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("should renders one cell with prop collspan = 2 when header is true and textSecondCell no exist", function () {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="1stCell" />
    );
    expect(wrapper.find("th").prop("colSpan")).toEqual(2);
  });

  it("should renders two cell when textSecondCell is present", function () {
    const wrapper = shallow(
      <CourseListRow
        isHeader={true}
        textFirstCell="1stCell"
        textSecondCell="2ndCell"
      />
    );
    expect(wrapper.find("th").length).toEqual(2);
  });
});

describe("CourseListRow Composant Tesy when header is False", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("should renders correctly two td elements within a tr element", function () {
    const wrapper = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="1stCell"
        textSecondCell="2ndCell"
      />
    );
    expect(wrapper.find("tr").children().length).toEqual(2);
  });
});
