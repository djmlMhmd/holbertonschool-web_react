import React from "react";
import CourseListRow from "./CourseListRow";
import CourseShape from "./CourseShape";
import propTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

export function CourseList({ listCourses }) {
  CourseList.propTypes = {
    listCourses: propTypes.arrayOf(propTypes.shape(CourseShape)),
  };

  CourseList.defaultProps = {
    listCourses: [],
  };

  return (
    <table id="CourseList" className={css(styles.CourseList)}>
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow
          isHeader={true}
          textFirstCell="Course name"
          textSecondCell="Credit"
        />
      </thead>
      <tbody>
        {listCourses && listCourses.length !== 0 ? (
          listCourses.map((course) => (
            <CourseListRow
              key={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))
        ) : (
          <CourseListRow
            isHeader={false}
            textFirstCell="No course available yet"
          />
        )}
      </tbody>
    </table>
  );
}

const styles = StyleSheet.create({
  CourseList: {
    marginTop: "50px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    textAlign: "left",
    border: "1px solid #dbdada",
  },
});

export default CourseList;
