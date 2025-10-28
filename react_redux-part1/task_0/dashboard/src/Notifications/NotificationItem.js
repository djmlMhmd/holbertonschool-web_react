import React from "react";
import PropTypes from 'prop-types';
import {StyleSheet, css} from "aphrodite";

const NotificationItem = ({id, type, value, html, markAsRead}) => {
    const handleClick = () => {
      markAsRead(id);
    };

    let listItem;

    if (value) {
      listItem = <li className={css(styles.default)} onClick={handleClick} data-notification-type={type}>{value}</li>;
    } else {
      listItem =
        <li className={css(styles.urgent)} onClick={handleClick} data-notification-type={type} dangerouslySetInnerHTML={html}></li>;
    }

    return listItem;
}

const styles = StyleSheet.create({
  default: {
    color: "blue",
    "@media (max-width: 900px)": {
      borderBottom: "1px solid black",
      padding: "15px 0",
      fontSize: "20px"
    }
  },
  urgent: {
    color: "red",
    "@media (max-width: 900px)": {
      borderBottom: "1px solid black",
      padding: "15px 0",
      fontSize: "20px"
    }
  }
})

NotificationItem.prototypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  html : PropTypes.shape({
    __html: PropTypes.string.isRequired
  }),
  value: PropTypes.string.isRequired,
  markAsRead: PropTypes.func.isRequired
};

NotificationItem.defaultProps = {
  type: 'default'
}

export default React.memo(NotificationItem);