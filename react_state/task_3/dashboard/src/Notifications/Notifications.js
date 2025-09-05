import React from "react";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import propTypes, { func } from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
    this.closeClick = this.closeClick;
  }
  closeClick = () => {
    console.log("Close button has been clicked");
  };
  render() {
    const { handleDisplayDrawer, handleHideDrawer } = this.props;
    const { markNotificationAsRead } = this.props;

    return (
      <div className={css(styles.CompNotification)}>
        <div className={css(styles.ParagraphemenuItem)}>
          <p onClick={handleDisplayDrawer}>Your notifications</p>
        </div>
        {this.props.displayDrawer && (
          <div className={css(styles.Notifications)}>
            <button
              className={css(styles.ButtoncompNotification)}
              onClick={handleHideDrawer}
              aria-label="Dismiss"
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                float: "right",
              }}
            >
              <img
                className={css(styles.ImgagecompNotification)}
                src={closeIcon}
                alt="close"
                width={10}
              ></img>
            </button>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.ul)}>
              {this.props.listNotifications &&
              this.props.listNotifications.length !== 0 ? (
                this.props.listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    id={notification.id}
                    markAsRead={() => markNotificationAsRead(notification.id)}
                  />
                ))
              ) : (
                <NotificationItem
                  type="default"
                  value="No new notification for now"
                />
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: propTypes.bool,
  listNotifications: propTypes.arrayOf(propTypes.shape(NotificationItemShape)),
  handleDisplayDrawer: propTypes.func,
  handleHideDrawer: propTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

const opacityAnimation = {
  "50%": {
    opacity: 0.5,
  },
  "100%": {
    opacity: 1,
  },
};

const bounceAnimation = {
  "0%, 100%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-5px)",
  },
};

const styles = StyleSheet.create({
  Notifications: {
    border: "dotted 2px #E0354B",
    padding: "1% 0% 0% 3%",
    ":hover": {
      backgroundColor: "#fff8f8",
      cursor: "pointer",
    },
    "@media (max-width: 600px)": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "white",
      border: "none",
      padding: 0,
    },
  },
  liUrgent: {
    color: "red",
  },
  liDefault: {
    color: "blue",
  },

  CompNotification: {
    position: "absolute",
    top: "0",
    right: "0",
    marginRight: "20px",
    width: "380px",
  },

  ParagraphemenuItem: {
    marginBottom: "5px",
    textAlign: "right",
    ":hover": {
      animationName: [bounceAnimation, opacityAnimation],
      animationDuration: "0.5s",
      animationIterationCount: "3",
      cursor: "pointer",
    },
  },

  ImgagecompNotification: {
    height: "8px",
    width: "auto",
  },

  ButtoncompNotification: {
    padding: "0",
    marginRight: "3%",
    marginTop: "1%",
  },

  ul: {
    "@media (max-width: 600px)": {
      padding: 0,
    },
  },
});

export default Notifications;
