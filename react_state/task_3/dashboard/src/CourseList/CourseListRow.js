import React from "react";
import propTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

export function CourseListRow({
  isHeader = false,
  textFirstCell,
  textSecondCell = null,
}) {
  CourseListRow.propTypes = {
    isHeader: propTypes.bool,
    textFirstCell: propTypes.string.isRequired,
    textSecondCell: propTypes.string || propTypes.number,
  };

  const rowStyle = {
    backgroundColor: isHeader ? "#deb5b545" : "#f5f5f5ab",
  };

  if (isHeader == true) {
    if (textSecondCell == null) {
      return (
        <tr style={{ rowStyle }}>
          <th className={css(styles.hColSpan)} colSpan={2}>
            {textFirstCell}
          </th>
        </tr>
      );
    } else {
      return (
        <tr style={rowStyle}>
          <th className={css(styles.th)}>{textFirstCell}</th>
          <th className={css(styles.th)}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr style={rowStyle}>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
}

const styles = StyleSheet.create({
  th: {
    borderBottom: "1px solid #dbdada",
  },

  hColSpan: {
    textAlign: "center",
  },
});

export default CourseListRow;
