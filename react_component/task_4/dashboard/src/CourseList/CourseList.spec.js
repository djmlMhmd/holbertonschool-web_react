import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

const coursesList = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
];

describe('CourseList component', () => {
    it('renders 5 rows when courses are provided', () => {
        render(<CourseList courses={coursesList} />);
        expect(screen.getAllByRole('row')).toHaveLength(5);
    });

    it('renders the course names and credits', () => {
        render(<CourseList courses={coursesList} />);
        expect(screen.getByText('ES6')).toBeInTheDocument();
        expect(screen.getByText('Webpack')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('renders No course available yet when the list is empty', () => {
        render(<CourseList courses={[]} />);
        expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
    });
});
