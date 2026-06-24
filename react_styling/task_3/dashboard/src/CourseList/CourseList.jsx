import React from 'react';
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
    if (courses.length === 0) {
        return (
            <div className="mx-auto my-12 w-4/5">
                <span className="sr-only">Available courses</span>
                <table id="CourseList" className="w-full border-collapse">
                    <thead>
                        <CourseListRow textFirstCell="No course available yet" isHeader={true} />
                    </thead>
                </table>
            </div>
        );
    }

    return (
        <div className="mx-auto my-12 w-4/5">
            <table id="CourseList" className="w-full border-collapse">
                <thead>
                    <CourseListRow textFirstCell="Available courses" isHeader={true} />
                    <CourseListRow
                        textFirstCell="Course name"
                        textSecondCell="Credit"
                        isHeader={true}
                    />
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <CourseListRow
                            key={course.id}
                            textFirstCell={course.name}
                            textSecondCell={course.credit.toString()}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseList;
