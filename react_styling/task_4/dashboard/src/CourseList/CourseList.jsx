import React from 'react';
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
    if (courses.length === 0) {
        return (
            <div className="mx-auto my-20 w-[66%] min-[520px]:my-14 min-[520px]:w-[78%] min-[912px]:mb-12 min-[912px]:mt-24 min-[912px]:w-4/5">
                <span className="sr-only">Available courses</span>
                <table id="CourseList" className="w-full border-collapse text-xs min-[520px]:text-base">
                    <thead>
                        <CourseListRow textFirstCell="No course available yet" isHeader={true} />
                    </thead>
                </table>
            </div>
        );
    }

    return (
        <div className="mx-auto my-20 w-[66%] min-[520px]:my-14 min-[520px]:w-[78%] min-[912px]:my-12 min-[912px]:flex min-[912px]:min-h-[22rem] min-[912px]:w-4/5 min-[912px]:items-center">
            <table id="CourseList" className="w-full border-collapse text-xs min-[520px]:text-base">
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
