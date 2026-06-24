import React from 'react';

function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    const rowClass = isHeader ? 'bg-table-header' : 'bg-table-rows';
    const rowStyle = {
        backgroundColor: isHeader
            ? 'rgb(from var(--color-table-header) r g b / 27%)'
            : 'rgb(from var(--color-table-rows) r g b / 67%)'
    };

    if (isHeader === true) {
        if (textSecondCell === null) {
            return (
                <tr className={rowClass} style={rowStyle}>
                    <th colSpan="2" className="border border-black p-[0.2rem] text-center">{textFirstCell}</th>
                </tr>
            );
        }
        return (
            <tr className={rowClass} style={rowStyle}>
                <th className="w-[60%] border border-black p-[0.2rem] text-center">{textFirstCell}</th>
                <th className="w-[40%] border border-black p-[0.2rem] text-center">{textSecondCell}</th>
            </tr>
        );
    }

    if (textSecondCell === null) {
        return (
            <tr className={rowClass} style={rowStyle}>
                <td className="border border-black p-[0.2rem] text-center">{textFirstCell}</td>
                <td className="border-none w-0"></td>
            </tr>
        );
    }
    return (
        <tr className={rowClass} style={rowStyle}>
            <td className="w-[60%] border border-black p-[0.2rem]">{textFirstCell}</td>
            <td className="w-[40%] border border-black p-[0.2rem]">{textSecondCell}</td>
        </tr>
    );
}

export default CourseListRow;
