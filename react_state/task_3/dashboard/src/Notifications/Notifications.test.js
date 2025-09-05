import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { getLatestNotification } from "../utils/utils";
import { StyleSheetTestUtils } from "aphrodite";
import { func } from "prop-types";

describe("Notification Composant displayDrawers is true", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  let listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  it("should Notifications renders without crashing", function () {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should renders the text <<Here is the list of notifications>>", () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    expect(wrapper.contains("Here is the list of notifications")).toEqual(true);
  });

  it("renders list of notifications correctly with the right number of NotificationItem", () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    expect(wrapper.find(NotificationItem).length).toEqual(
      listNotifications.length
    );
  });

  it("clicking on the menu item calls handleDisplayDrawer", function () {
    const handleHideDrawerMock = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        handleDisplayDrawer={() => {}}
        handleHideDrawer={handleHideDrawerMock}
      />
    );
    const button = wrapper.find("button");
    button.simulate("click");
    expect(handleHideDrawerMock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});

describe("Notification Composant displayDrawers is False", function () {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  let listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  it("should menu item is being displayed when displayDrawer is false", function () {
    const wrapper = shallow(
      <Notifications
        displayDrawer={false}
        listNotifications={listNotifications}
      />
    );
    expect(wrapper.find(".menuItem").exists()).toBeFalsy();
  });

  it("should Notifications is not being displayed when displayDrawer is false", function () {
    const wrapper = shallow(
      <Notifications
        displayDrawer={false}
        listNotifications={listNotifications}
      />
    );
    expect(wrapper.find(".Notifications").exists()).toBeFalsy();
  });

  it("clicking on the menu item calls handleDisplayDrawer", function () {
    const handleDisplayDrawerMock = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={false}
        listNotifications={[]}
        handleDisplayDrawer={handleDisplayDrawerMock}
        handleHideDrawer={() => {}}
      />
    );
    const button = wrapper
      .find("p")
      .filterWhere((node) => node.text() === "Your notifications");
    button.simulate("click");
    expect(handleDisplayDrawerMock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});

describe("markAsRead fcuntion", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
});
