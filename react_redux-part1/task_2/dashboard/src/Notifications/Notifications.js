import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";
import close from "../assets/close.png";

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      displayDrawer,
      markNotificationAsRead,
    } = this.props;

    return (
      <>
        <div className={css(styles.notification)} onClick={handleDisplayDrawer}>
          <div id="menuItem" className={css(styles.menuItem)}>Your notifications</div>
        </div>
          {displayDrawer && (
            <div id="Notifications" className={css(styles.notifications)}>
              <button
                className={css(styles.button)}
                aria-label="close"
                onClick={handleHideDrawer}
              >
                <img style={{ width: "15px" }} src={close} alt="button close" />
              </button>
              <p>Here is the list of notifications</p>

              <ul className={css(styles.ul)}>
                {listNotifications.length === 0 && (
                  <NotificationItem value="No new notification for now" />
                )}
                {listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={() => markNotificationAsRead(notification.id)}
                  />
                ))}
              </ul>
            </div>
          )}
        
      </>
    );
  }
}

const translateKeyframes = {
  "0%": {
    transform: "translateY(0px)",
  },
  "20%": {
    transform: "translateY(-5px)",
  },
  "60%": {
    transform: "translateY(5px)",
  },
  "90%": {
    transform: "translateY(-2px)",
  },
  "100%": {
    transform: "translateY(0px)",
  },
};

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const styles = StyleSheet.create({
  notification: {
    width: "100%",
    position: "relative",
  },
  notifications: {
    backgroundColor: "white",
    border: "2px dashed red",
    position: " absolute",
    width: "35%",
    right: "0",
    top: "50px",
    padding: "15px",
    "@media (max-width: 900px)": {
      width: "100%",
      height: "100vh",
      border: "none",
      cursor: "pointer",
      padding: "0 0 0 20px",
    },
  },
  menuItem: {
    textAlign: "end",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    ":hover": {
      animationName: [opacityKeyframes, translateKeyframes],
      animationDuration: "1s",
      animationIterationCount: "3",
    },
    "@media (max-width: 900px)": {
      textAlign: "start",
      padding: "15px",
    },
  },
  button: {
    display: "flex",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  ul: {
    cursor: "pointer",
    margin: "20px 0 0 10px",
    "@media (max-width: 900px)": {
      listStyleType: "none",
      padding: "10px",
      margin: "0",
    },
  },
});

Notifications.defaultProps = {
  displayDrawer: true,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.array.isRequired,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

export default Notifications;
