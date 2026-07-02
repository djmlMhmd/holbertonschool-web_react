import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
    it('renders one th with colspan 2 when isHeader is true and textSecondCell is null', () => {
        render(
            <table>
                <thead>
                    <CourseListRow isHeader={true} textFirstCell="Available courses" />
                </thead>
            </table>
        );
        const th = screen.getByText('Available courses');
        expect(th).toHaveAttribute('colspan', '2');
    });

    it('renders two th cells when isHeader is true and textSecondCell is set', () => {
        render(
            <table>
                <thead>
                    <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
                </thead>
            </table>
        );
        expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    });

    it('renders two td cells when isHeader is false', () => {
        render(
            <table>
                <tbody>
                    <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell={60} />
                </tbody>
            </table>
        );
        expect(screen.getAllByRole('cell')).toHaveLength(2);
    });
});
