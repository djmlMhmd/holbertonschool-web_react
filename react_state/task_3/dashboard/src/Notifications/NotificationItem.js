import React from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite";
import { StyleSheet } from "aphrodite";

function NotificationItem({ type, html, value, markAsRead, id }) {
  return (
    <li
      className={css(
        styles.notifications,
        type === "default" && styles.liDefault,
        type === "urgent" && styles.liUrgent,
        styles.listItem
      )}
      onClick={() => markAsRead(id)}
      data-notification-type={type}
      dangerouslySetInnerHTML={html}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  markAsRead: () => {},
};

const styles = StyleSheet.create({
  liUrgent: {
    color: "red",
  },
  liDefault: {
    color: "blue",
  },
  listItem: {
    "@media (max-width: 600px)": {
      borderBottom: "1px solid black",
      padding: "10px 8px",
      fontSize: "20px",
      listStyleType: "none",
    },
  },
});
export default React.memo(NotificationItem);
