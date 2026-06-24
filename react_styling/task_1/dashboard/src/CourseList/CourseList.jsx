import React from 'react';
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
    if (courses.length === 0) {
        return (
            <div className="CourseListContainer w-full h-full px-20 flex-1 flex justify-center items-center">
                <table id="CourseList" className="w-full border-collapse">
                    <tbody>
                        <CourseListRow textFirstCell="No course available yet" isHeader={true} />
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="CourseListContainer w-full h-full px-20 flex-1 flex justify-center items-center">
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
                    {courses.map(course => (
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
