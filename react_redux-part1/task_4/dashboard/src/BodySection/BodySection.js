import React from "react";
import {StyleSheet, css} from "aphrodite";

function BodySection({title, children}) {
  return (
    <div className={css(styles.bodySection)}>
        <h2>{title}</h2>
        {children}
    </div>
  )
}

const styles = StyleSheet.create({
  bodySection: {
    width: '100%',
    display: 'flex',
    justifyContent: "center",
    flexDirection: 'column',
  }
})
export default BodySection