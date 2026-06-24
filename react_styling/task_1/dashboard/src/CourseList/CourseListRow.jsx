import React from 'react';

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    const rowClass = isHeader ? 'bg-table-header opacity-66' : 'bg-table-rows opacity-45';

    if (isHeader === true) {
        if (textSecondCell === null) {
            return (
                <tr className={rowClass}>
                    <th colSpan="2" className="border border-gray-400 p-[0.2rem] text-center">{textFirstCell}</th>
                </tr>
            );
        }
        return (
            <tr className={rowClass}>
                <th className="w-[60%] border border-gray-400 p-[0.2rem] text-center">{textFirstCell}</th>
                <th className="w-[40%] border border-gray-400 p-[0.2rem] text-center">{textSecondCell}</th>
            </tr>
        );
    }

    if (textSecondCell === null) {
        return (
            <tr className={rowClass}>
                <td className="border border-gray-400 p-[0.2rem] pl-2 text-center">{textFirstCell}</td>
                <td className="border-none w-0"></td>
            </tr>
        );
    }
    return (
        <tr className={rowClass}>
            <td className="w-[60%] border border-gray-400 p-[0.2rem] pl-2">{textFirstCell}</td>
            <td className="w-[40%] border border-gray-400 p-[0.2rem] pl-2">{textSecondCell}</td>
        </tr>
    );
}

export default CourseListRow;
