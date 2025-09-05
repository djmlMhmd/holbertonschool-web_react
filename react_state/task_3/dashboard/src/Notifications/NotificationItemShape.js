import propTypes from "prop-types";

const NotificationItemShape = propTypes.shape({
  id: propTypes.number.isRequired,
  html: propTypes.shape({
    __html: propTypes.string.isRequired,
  }).isRequired,
  type: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
});

export default NotificationItemShape;
