import React from "react"
import BodySection from './BodySection'
import { PropTypes } from 'prop-types';
import {StyleSheet, css} from 'aphrodite';

function BodySectionWithMarginBottom({title, children}) {
  return (
    <div className={css(styles.bodySectionWithMargin)}>
        <BodySection title={title}>
            {children}
        </BodySection>
    </div>
  )
}

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
    width: '80%',
  }
})

BodySectionWithMarginBottom.propType = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default BodySectionWithMarginBottom;