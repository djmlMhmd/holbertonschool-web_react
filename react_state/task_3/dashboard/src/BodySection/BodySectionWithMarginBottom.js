import React from "react";
import BodySection from "./BodySection";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class BodySectionWithMarginBottom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={css(styles.BodySectionWithMarginBottom)}>
        <BodySection {...this.props} />
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  bodySectionWithMargininBottom: {
    marginBottom: "40px",
  },
});

export default BodySectionWithMarginBottom;
