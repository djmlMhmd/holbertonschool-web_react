import React from 'react';

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    const rowClass = isHeader ? 'bg-table-header opacity-66' : 'bg-table-rows opacity-45';

    if (isHeader === true) {
        if (textSecondCell === null) {
            return (
                <tr className={rowClass}>
                    <th colSpan="2" className="border border-gray-400">{textFirstCell}</th>
                </tr>
            );
        }
        return (
            <tr className={rowClass}>
                <th className="border border-gray-400">{textFirstCell}</th>
                <th className="border border-gray-400">{textSecondCell}</th>
            </tr>
        );
    }

    if (textSecondCell === null) {
        return (
            <tr className={rowClass}>
                <td className="border border-gray-400 pl-2">{textFirstCell}</td>
                <td className="border border-gray-400 pl-2"></td>
            </tr>
        );
    }
    return (
        <tr className={rowClass}>
            <td className="border border-gray-400 pl-2">{textFirstCell}</td>
            <td className="border border-gray-400 pl-2">{textSecondCell}</td>
        </tr>
    );
}

export default CourseListRow;
