import React from 'react';
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import {StyleSheet, css} from "aphrodite"

import CourseShape from './CourseShape';

function CourseList({listCourses}) {
  return (
    <table className={css(styles.courseList)}>
        <thead className={css(styles.thead)}>
            <CourseListRow textFirstCell='Available courses' isHeader={true}/>
            <CourseListRow textFirstCell='Course name' textSecondCell='Credit' isHeader={true}/>
        </thead>

        <tbody>

            {listCourses.length === 0 && (
              <CourseListRow textFirstCell='No course available yet' isHeader={false}/>
            )}

            {listCourses.map((course) => (
              <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} isHeader={false}/>
            ))}
        </tbody>
    </table>
  )
}

const styles = StyleSheet.create({
  courseList: {
    border: "1px solid #ccc",
    width: "90%",
    margin: "auto",
    marginTop: "40px",
    fontSize: "22px",
  },
})

CourseList.defaultProps = {
  listCourses: []
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape)
}


export default CourseList