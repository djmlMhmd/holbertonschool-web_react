import React from 'react';
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
    if (courses.length === 0) {
        return (
            <div className="flex h-full w-full flex-1 items-center justify-center px-20">
                <table id="CourseList" className="w-full border-collapse">
                    <tbody>
                        <CourseListRow textFirstCell="No course available yet" isHeader={true} />
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-1 items-center justify-center px-20">
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
