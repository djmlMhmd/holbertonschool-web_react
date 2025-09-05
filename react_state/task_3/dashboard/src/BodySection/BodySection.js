import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class BodySection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, title } = this.props;
    return (
      <div className={css(styles.bodySection)}>
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

BodySection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  bodySection: {
    marginBottom: "40px",
    "@media (max-width: 600px)": {
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: "10%",
    },
  },
});

export default BodySection;
